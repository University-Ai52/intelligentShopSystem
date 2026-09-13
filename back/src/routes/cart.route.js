const cardRouter = require("express").Router()
const { getCart, addItem, updateItem, removeItem, clearCart } = require("../controllers/cart.controller")
const {  auth } = require("../middleware/auth")

cardRouter.get("/", auth, getCart)
cardRouter.post("/items", auth, addItem)
cardRouter.patch("/items/:productId", auth,updateItem)
cardRouter.delete("/items/:productId", auth, removeItem)
cardRouter.delete("/", auth, clearCart)

module.exports = cardRouter
