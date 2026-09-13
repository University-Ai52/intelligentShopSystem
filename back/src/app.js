const express = require("express")

const morgan = require("morgan")
const cardRouter = require("./routes/cart.route")



const app = express()

app.use(express.json())

app.use(morgan("dev"))

// app.use("/products",route.get())
app.use("/api/v1/cart",cardRouter)
module.exports = app 