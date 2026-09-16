const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductId,
    updateProduct,
    deleteProduct
} = require("../controllers/products.controllers.js");
const { requireAdmin } = require("../middleware/auth.js");

router.get("/", getProducts);

router.get("/:slug", getProductId);

router.post("/admin",requireAdmin,createProduct);

router.put("/admin/:slug",requireAdmin,updateProduct);

router.delete("/admin/:slug", requireAdmin, requireAdmin,deleteProduct);


module.exports = router;