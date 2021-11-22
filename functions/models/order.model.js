// sample model for the user profile

const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    order_id: Number,
    fullName: String,
    email: String,
    phoneNumber: String,
    address: String,
    city: String,
    postalCode: String,
    date: String,
    time: String,
    paymentStatus: Boolean,
    paymentAmmount: Number,
    doneStatus: Boolean,
    orderConfirmation: Boolean,
    frameName: String,
    files: [],
  })
);

module.exports = Order;
