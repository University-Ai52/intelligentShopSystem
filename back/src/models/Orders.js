const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true                
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      product: {
        type: ObjectId,
        ref: "Product",
        required: true
      },
      name: String,            
      price: Number,           
      quantity: Number,
      image: String             
    }
  ],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  billingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: [
      "pending",     
      "paid",         
      "processing",   
      "shipped",
      "delivered",
      "cancelled"
    ],
    default: "pending"
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  paymentIntentId: {
    type: String               
  },
  trackingNumber: {
    type: String
  },
  notes: {
    type: String
  }
});


const ordersModel = mongoose.model("Orders", ordersSchema);

module.exports = ordersModel;