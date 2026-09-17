const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductId,
    updateProduct,
    deleteProduct
} = require("../controllers/products.controller.js");
const { auth, requireAdmin } = require("../middleware/auth.js");

router.get("/", getProducts);

router.get("/:slug", getProductId);

router.post("/admin", auth, requireAdmin, createProduct);

router.put("/admin/:slug", auth, requireAdmin,updateProduct);

router.delete("/admin/:slug", auth, requireAdmin, deleteProduct);


module.exports = router;