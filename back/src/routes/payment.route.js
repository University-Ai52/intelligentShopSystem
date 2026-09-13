const express = require("express")
const controller = require("../controllers/product.controller")
const { protect, adminOnly } = require("../middleware/auth")
const { createPaymentIntent , stripeWebhook } = require("../controllers/payment.controller")

const paymentRouter = express.Router()

paymentRouter.post("/create-intent", protect, createPaymentIntent)
paymentRouter.post("/webhook", stripeWebhook)


module.exports = paymentRouter