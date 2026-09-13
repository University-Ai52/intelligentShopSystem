const product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const products = await product.create(req.body);

    res.status(201).json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const filter = {isDeleted: false};

    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
    }

    if (req.query.minPrice) {
      filter.price.$gte = Number(req.query.minPrice);
    }

    if (req.query.maxPrice) {
      filter.price.$lte = Number(req.query.maxPrice);
    }

    let sort = {};

    if (req.query.sort === "price_asc") {
      sort = { price: 1 };
    } else if (req.query.sort === "price_desc") {
      sort = { price: -1 };
    } else if (req.query.sort === "newest") {
      sort = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const products = await product
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await product.countDocuments(filter);

    res.status(200).json({
      data: products,
      total: total,
      page: page,
      limit: limit
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const getProductId = async (req, res) => {
  try {
    const foundProduct = await product.findOne({
      slug: req.params.slug
    });

    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: foundProduct
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await product.findOneAndDelete({ slug: req.params.slug });

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
     });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductId,
  updateProduct,
  deleteProduct
};
//test