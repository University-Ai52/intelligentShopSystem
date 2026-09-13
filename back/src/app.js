const express = require("express");
const morgan = require("morgan");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1/products", productRoutes);


module.exports = app;