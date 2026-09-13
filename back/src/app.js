const express = require("express");

const morgan = require("morgan");

const productRoutes = require("./routes/product.routes");
const cardRouter = require("./routes/cart.route");

const app = express();

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1/products", productRoutes);

app.use("/app/v1/cart",cardRouter);

module.exports = app;