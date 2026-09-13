const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            unique:true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "quantity is integer positive"]
        },
        priceAtAdd: {
            type: Number,
            required: true,
            min: [0, "price cannot be negative"]
        }
    }]
}, {
    timestamps: true,
    versionKey: false
})

const cart = mongoose.model("Cart", cartSchema)

module.exports = cart