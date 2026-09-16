const express = require("express");

const morgan = require("morgan");

const productRoutes = require("./routes/product.routes");
const cartRouter = require("./routes/cart.route");
const categoryRouter = require("./routes/category.route");
const orderRouter = require("./routes/order.route");
const authRoutes = require("./routes/auth");
const paymentRouter = require("./routes/payment.route");

const app = express();

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/orders", orderRouter )
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/payment", paymentRouter)

module.exports = app;