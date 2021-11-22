const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.customer = require("./customer.model");
db.order = require("./order.model");
db.files = require("./files.model");
db.totalOrderOfNumbers = require("./total-orders.model");

module.exports = db;
