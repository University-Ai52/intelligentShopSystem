const express = require("express")
const Product = require("../controllers/products.controllers")
const { auth } = require("../middleware/auth")
const { createPaymentIntent , stripeWebhook } = require("../controllers/payment.controller")

const paymentRouter = express.Router()

paymentRouter.post("/create-intent", auth, createPaymentIntent)
paymentRouter.post("/webhook", stripeWebhook)


module.exports = paymentRouter