// sample model for the user profile

const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    address: String,
    city: String,
    date: String,
  })
);

module.exports = Customer;
