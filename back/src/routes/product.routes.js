const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductId,
    updateProduct,
    deleteProduct
} = require("../controllers/products.controllers.js");

router.get("/products", getProducts);

router.get("/products/:slug", getProductId);

router.post("/admin/products",requireAdmin,createProduct);

router.put("/admin/products/:slug",requireAdmin,updateProduct);

router.delete("/admin/products/:slug", requireAdmin, requireAdmin,deleteProduct);


module.exports = router;