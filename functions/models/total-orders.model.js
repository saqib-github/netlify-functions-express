// sample model for the user profile

const mongoose = require("mongoose");

const Total_Order = mongoose.model(
  "TotalOrders",
  new mongoose.Schema({
    totalOrderOfNumbers: Number,
  })
);

module.exports = Total_Order;
