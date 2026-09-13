const cardRouter = require("express").Router()
const { getCart, addItem, updateItem, removeItem, clearCart } = require("../controllers/cart.controller")
const { protect } = require("../middleware/auth")

cardRouter.get("/", protect, getCart)
cardRouter.post("/items", protect, addItem)
cardRouter.patch("/items/:productId", protect,updateItem)
cardRouter.delete("/items/:productId", protect, removeItem)
cardRouter.delete("/", protect, clearCart)

module.exports = cardRouter
