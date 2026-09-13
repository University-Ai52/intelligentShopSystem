const express = require("express");
const { getAllCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory } = require("./../controllers/category.controller.js");
const { requireAdmin } = require("../middleware/auth.js");

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:slug", getCategoryBySlug);

categoryRouter.post("/admin", requireAdmin, createCategory);
categoryRouter.put("/admin/:id", requireAdmin, updateCategory);
categoryRouter.delete("/admin/:id", requireAdmin, deleteCategory);

module.exports = categoryRouter;