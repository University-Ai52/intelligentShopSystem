require("dotenv").config()
const stripe = require("../config/stripe");
const mongoose = require("mongoose");

const Order = require("../models/Orders");
const Product = require("../models/product");

exports.createPaymentIntent = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID"
            });
        }

        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (order.paymentStatus === "paid") {
            return res.status(400).json({
                success: false,
                message: "Order is already paid"
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.total * 100),
            currency: "EGP",

            metadata: {
                orderId: order._id.toString(),
                userId: req.user._id.toString()
            }
        });

        order.paymentIntentId = paymentIntent.id;

        await order.save();

        return res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Webhook signature verification failed:", error.message);

        return res.status(400).send(
            `Webhook Error: ${error.message}`
        );
    }

    try {
        switch (event.type) {

            case "payment_intent.succeeded":
                await handlePaymentSuccess(event.data.object);
                break;

            case "payment_intent.payment_failed":
                await handlePaymentFailed(event.data.object);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return res.status(200).json({
            received: true
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Webhook processing failed"
        });
    }
};

const handlePaymentFailed = async paymentIntent => {
    const order = await Order.findOne({ paymentIntentId: paymentIntent.id })
    if (!order) return

    order.paymentStatus = "failed"
    await order.save()
}


const handlePaymentSuccess = async (paymentIntent) => {

    const orderId = paymentIntent.metadata.orderId;

    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    // Important: don't process the same payment twice
    if (order.paymentStatus === "paid") {
        return;
    }

    order.paymentStatus = "paid";
    order.status = "paid";

    await order.save();

    // Reduce stock
    for (const item of order.items) {

        const product = await Product.findById(item.product);

        if (!product) {
            throw new Error(
                `Product not found: ${item.product}`
            );
        }

        if (product.stock < item.quantity) {
            throw new Error(
                `Not enough stock for product: ${product.name}`
            );
        }

        product.stock -= item.quantity;

        await product.save();
    }
};