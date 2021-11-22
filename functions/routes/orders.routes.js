const express = require("express");

const controllers = require("../controllers/orders.controllers");

const router = express.Router();

router.post("/placeorder", controllers.addNewOrder);
router.get("/allorders", controllers.getAllOrderList);
router.post("/update-complete", controllers.updateOrderCompletedStatus);
router.post("/order-confirmation", controllers.orderConfirmation);
router.post("/order-delete", controllers.deleteOrder);

module.exports = router;
