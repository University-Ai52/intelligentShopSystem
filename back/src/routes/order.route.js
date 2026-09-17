const express = require("express");
const { createOrder, getUserOrders, getUserOrderById, getAllOrders, updateOrderStatus } = require("./../controllers/order.controller.js");
const { auth ,requireAdmin } = require("../middleware/auth.js");

const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);
orderRouter.get("/", auth, getUserOrders);
orderRouter.get("/admin",auth, requireAdmin, getAllOrders);
orderRouter.put("/admin/:id",auth, requireAdmin, updateOrderStatus);

orderRouter.get("/:id", auth, getUserOrderById);

module.exports = orderRouter;