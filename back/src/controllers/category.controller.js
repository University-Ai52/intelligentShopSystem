const mongoose  = require("mongoose");
const categoryModel = require("./../models/Category.js");
const slugify = require("slugify");

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({ isActive: true });

        return res.status(200).json({
            success: true, 
            data: categories
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        if(!slug) {
            return res.status(400).json({
                success: false,
                message: "Slug is required"
            });
        }

        const category = await categoryModel.findOne({ slug, isActive: true });
        
        if(!category) { 
            return res.status(404).json({
                success: false,
                message: "Category not found"
            }); 
        };

        return res.status(200).json({
            success: true, 
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const slug = slugify(name);
    const category = await categoryModel.create({
      name,
      slug,
      description,
      image,
    });
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Category name or slug already exists" });
    }
    res.status(500).json({ message: "Failed to create category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, isActive } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    const updateData = {};
    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({ 
            message: "Category name cannot be empty" 
        });
      }
      updateData.name = name;
      updateData.slug = slugify(name);
    }
    if (description !== undefined) {
      updateData.description = description;
    }
    if (image !== undefined) {
      updateData.image = image;
    }
    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }
    const category = await categoryModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Category name or slug already exists" });
    }
    console.error(error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    } 
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};

module.exports = { getAllCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory };