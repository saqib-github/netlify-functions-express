const db = require("../models");
const totalOrderOfNumbers = db.totalOrderOfNumbers;

exports.getTotalOrderOfNumbers = (req, res) => {
  totalOrderOfNumbers
    .find()
    .then((result) => {
      res.status(200).json({ status: "Success", data: result });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(400).json({ status: "Failed", data: error });
    });
};
