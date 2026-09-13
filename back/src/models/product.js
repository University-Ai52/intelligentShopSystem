const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Product name must be at least 3 characters long"],
            maxlength: [100, "Product name must be at most 100 characters long"],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        compareAtPrice: {
            type: Number,
            min: 0,
        },
        sku: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        images: [
            {
                type: String,
            },
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

productSchema.index({ category: 1 });
productSchema.index({
    name: "text",
    description: "text",
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
