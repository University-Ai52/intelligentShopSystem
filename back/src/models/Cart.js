const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
    card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "card",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "quantity must be at least 1"]
    },
    priceAtAdd: {
        type: Number,
        required: true,
        min: [0, "price cannot be negative"]
    }
}, { _id: false })

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: {
        type: [cartItemSchema],
        default: []
    }
}, {
    timestamps: true,
    versionKey: false
})

const cart = mongoose.model("Cart", cartSchema)

module.exports = cart