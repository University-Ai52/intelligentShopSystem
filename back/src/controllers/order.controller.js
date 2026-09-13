const mongoose = require("mongoose");
const ordersModel = require("./../models/Orders.js");
const cartModel = require("./../models/Cart.js");
const productModel = require("./../models/product.js")

const createOrder = async (req, res) => {
    try {
        const { shippingAddress, billingAddress, notes } = req.body;

        const cart = await cartModel
            .findOne({ user: req.user._id })
            .populate("items.product");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        if (!cart.items.length) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        if (!shippingAddress || !billingAddress) {
            return res.status(400).json({
                success: false,
                message: "Shipping address and billing address are required",
            });
        }

        const items = cart.items.map((item) => {
            if (!item.product) {
                throw new Error("Product not found");
            }
        
            return {
                product: item.product._id,
                name: item.product.name,
                price: item.priceAtAdd,
                quantity: item.quantity,
                image: item.product.image
            };
        });

        const subtotal = items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        const orderNumber = `ORD-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 6)
            .toUpperCase()}`;

        const order = await ordersModel.create({
            orderNumber,
            user: req.user._id,
            items,
            shippingAddress,
            billingAddress,
            subtotal,
            total: subtotal,
            notes,
        });

        cart.items = [];
        await cart.save();

        return res.status(201).json({
            success: true,
            data: order
        });
        
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userOrders = await ordersModel.find({ user: req.user._id });

        return res.status(200).json({
            success: true,
            data: userOrders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getUserOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        const userOrder = await ordersModel.findOne({ _id: id, user: req.user._id });

        if(!userOrder) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }

        return res.status(200).json({
            success: true,
            data: userOrder
        });

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await ordersModel.find();

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if(!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required"
            });
        }

        if(!status) {
            return res.status(400).json({
                success: false,
                message: "status is required"
            });
        }

        if(!["pending","paid","processing","shipped","delivered","cancelled"].includes(status)){
            return res.status(400).json({
                success: false,
                message: "status is wrong"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        const updateOrder = await ordersModel.findOneAndUpdate({ _id: id }, {
            status
        }, { runValidators: true });

        if(!updateOrder) {
            return res.status(400).json({
                success: false,
                message: "Invalid order id"
            });
        }

        return res.status(200).json({
            success: true,
            data: updateOrder
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = { createOrder, getUserOrders, getUserOrderById, getAllOrders, updateOrderStatus };