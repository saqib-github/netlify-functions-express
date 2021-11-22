const express = require("express");

const controllers = require("../controllers/total_orders.controllers");

const router = express.Router();

router.get("/orders", controllers.getTotalOrderOfNumbers);

module.exports = router;
