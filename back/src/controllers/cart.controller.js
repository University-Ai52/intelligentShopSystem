const Cart = require("../models/Cart")
const Product = require("../models/Product.js")
const catchAsync = require("../utils/catchAsync")

const getCart = userId => Cart.findOne({ user: userId }).populate(
    "items.product",
    "name slug price images stock isActive"
)

const addCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId })
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] })
        await cart.save()
    }
}

exports.getCart = catchAsync(async (req, res, next) => {
    await addCart(req.user._id)
    const cart = await getCart(req.user._id)
    res.status(200).json({
        success: true,
        itemsCount: cart.items.length,
        data: cart
    })
})

exports.addItem = catchAsync(async (req, res) => {
    await addCart(req.user._id)
    const { productId, quantity } = req.body
    const product = await Product.findOne({ _id: productId, isActive: true })
    if (!product) return res.status(404).json({ success: false, message: "Product not found" })

    let cart = await Cart.findOne({ user: req.user._id })
    const item = cart.items.find(item => item.product.toString() === product._id.toString())
    if (product.stock < quantity) return res.status(400).json({ success: false, message: "Requested quantity exceeds available stock" })
    else if (!item) {
        cart = await Cart.findOneAndUpdate({ user: cart.user },
            {
                $push: {
                    items: {
                        product: productId,
                        quantity,
                        priceAtAdd: product.price
                    }
                }
            },{
                returnDocument: true,
                runValidators: true
            })
    }
    else {

        cart = await Cart.findOneAndUpdate({
            user: cart.user,
            "items.product": product._id
        },
            {
                $set: {
                    "items.$.quantity": quantity
                }
            },
            {
                returnDocument: true,
                runValidators: true
            })
    }
    res.status(201).json({ success: true, data:  await getCart(cart.user) })
})

exports.updateItem = catchAsync( async (req, res) => {
    addCart(req.user._id)
    const quantity = Number(req.body.quantity)
    if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ success: false, message: "quantity must be a positive integer" })
    }

    const product = await Product.findOne({ _id: req.params.productId, isActive: true })

    if (!product) return res.status(404).json({ success: false, message: "Product not found" })
    if (quantity > product.stock) return res.status(400).json({ success: false, message: "Requested quantity exceeds available stock" })

    let cart = await Cart.findOne({ user: req.user._id })
    const item = cart.items.find(item => item.product.toString() === req.params.productId)
    if (!item) return res.status(404).json({ success: false, message: "Product is not in the cart" })
    cart = await Cart.findOneAndUpdate({
        user: cart.user,
        "items.product": product._id
    },
    {
        $set: {
            "items.$.quantity": quantity
        }
    },
    {
        returnDocument: true,
        runValidators: true
    })
    res.json({ success: true, data: await getCart(cart.user) })

})

exports.removeItem = catchAsync( async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" })

    const originalLength = cart.items.length
    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId)
    if (cart.items.length === originalLength) return res.status(404).json({ success: false, message: "Product is not in the cart" })

    await cart.save()
    res.json({ success: true, data: "Item deleted from card successfully"})
})

exports.clearCart = catchAsync( async (req, res) => {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] })
    res.json({ success: true, message: "Cart cleared successfully" })
})
