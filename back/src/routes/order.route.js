const express = require("express");
const { createOrder, getUserOrders, getUserOrderById, getAllOrders, updateOrderStatus } = require("./../controllers/order.controller.js");

const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);
orderRouter.get("/", auth, getUserOrders);
orderRouter.get("/:id", auth, getUserOrderById);

orderRouter.get("/admin", isAdmin, getAllOrders);
orderRouter.put("/admin", isAdmin, updateOrderStatus);

module.exports = orderRouter;