const express = require("express");
const { getAllCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory } = require("./../controllers/category.controller.js");
const { requireAdmin, auth } = require("../middleware/auth.js");

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:slug", getCategoryBySlug);

categoryRouter.post("/admin", auth, requireAdmin, createCategory);
categoryRouter.put("/admin/:id", auth, requireAdmin, updateCategory);
categoryRouter.delete("/admin/:id", auth, requireAdmin, deleteCategory);

module.exports = categoryRouter;