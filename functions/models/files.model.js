// sample model for the user profile

const mongoose = require("mongoose");

const Files = mongoose.model(
  "Files",
  new mongoose.Schema({
    files: [],
  })
);

module.exports = Files;
