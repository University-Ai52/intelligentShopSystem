const express = require("express");
const { getAllCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory } = require("./../controllers/category.controller.js");

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:slug", getCategoryBySlug);

categoryRouter.post("/admin", isAdmin, createCategory);
categoryRouter.put("/admin/:id", isAdmin, updateCategory);
categoryRouter.delete("/admin/:id", isAdmin, deleteCategory);

module.exports = categoryRouter;