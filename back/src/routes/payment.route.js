const express = require("express")
const Product = require("../controllers/products.controller")
const { auth } = require("../middleware/auth")
const { createPaymentIntent , stripeWebhook } = require("../controllers/payment.controller")

const paymentRouter = express.Router()

paymentRouter.post("/create-intent", auth, createPaymentIntent)

paymentRouter.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook)

module.exports = paymentRouter