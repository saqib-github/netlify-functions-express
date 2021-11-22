const db = require("../models");
const Customer = db.customer;

exports.getAllCustomerList = (req, res) => {
  Customer.find()
    .then((result) => {
      res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      console.log("error", error);
    });
};

exports.deleteCustomer = (req, res) => {
  console.log("id", req.body);
  Customer.findByIdAndDelete({ _id: req.body.id })
    .then((result) => {
      res.status(200).json({
        status: "Success",
        message: "Customer deleted successfully",
        data: result,
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(400).json({
        status: "Failed",
        message: "Failed to delete the order",
        data: error,
      });
    });
};
