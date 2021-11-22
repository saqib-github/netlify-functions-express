const express = require("express");

const controllers = require("../controllers/customers.controllers");

const router = express.Router();

router.get("/allcustomers", controllers.getAllCustomerList);
router.post("/customer-delete", controllers.deleteCustomer);

module.exports = router;
