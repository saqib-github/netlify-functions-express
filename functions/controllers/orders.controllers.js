const db = require("../models");
const Order = db.order;
const Customer = db.customer;
const totalOrderOfNumbers = db.totalOrderOfNumbers;
const moment = require("moment");
const nodemailer = require("nodemailer");

exports.addNewOrder = async (req, res) => {
  // for total number of orders (will use to create unique id's of order)
  console.log("data", req.body);
  totalOrderOfNumbers
    .findByIdAndUpdate(
      { _id: req.body.data.totalOrderData._id },
      {
        totalOrderOfNumbers:
          req.body.data.totalOrderData.totalOrderOfNumbers + 1,
      }
    )
    .then((result) => {
      console.log("result", result);
    })
    .catch((error) => {
      console.log("error", error);
    });
  // console.log("total", total);
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let emailAttachments = [];
  for (let i = 0; i < req.body.data.images.length; i++) {
    let obj = {
      filename: req.body.data.images[i].name,
      path: req.body.data.images[i].src,
    };
    emailAttachments.push(obj);
  }
  let mailDetails = {
    from: "saqib.browser@gmail.com", // user mail will placed here
    to: "rsaqib2034@gmail.com", // reciever mail where email will recieve
    subject: "Test mail",
    // text: `[Name: ${req.body.data.address.fullName}], [Address: ${req.body.data.address.address1}], [Postal Code: ${req.body.data.address.postalCode}], [City: ${req.body.data.address.city}], [Frame Type: ${req.body.data.frame}], [Payment Status: ${req.body.data.paymentStatus}], [Total Payment: ${req.body.data.paymentAmmount}] `,
    html: `<h1>New Order</h1> <h3>[ Full Name: ${req.body.data.address.fullName}],</h3> <h3>[ Email: ${req.body.data.address.email}], </h3> <h3>[Address: ${req.body.data.address.address1}],</h3> <h3> [Postal Code: ${req.body.data.address.postalCode}],</h3> <h3>[City: ${req.body.data.address.city}],</h3> <h3> [Frame Type: ${req.body.data.frame}],</h3> <h3> [Payment Status: ${req.body.data.paymentStatus}],</h3> <h3>  [Total Payment: ${req.body.data.paymentAmmount}]</h3>`,
    attachments: emailAttachments,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully");
    }
  });
  console.log(req.body.data);

  const newOrder = new Order({
    order_id: req.body.data.totalOrderData.totalOrderOfNumbers + 1,
    fullName: req.body.data.address.fullName,
    email: req.body.data.address.email,
    address: req.body.data.address.address1 + req.body.data.address.address2,
    phoneNumber: req.body.data.address.phoneNumber,
    city: req.body.data.address.city,
    postalCode: req.body.data.address.postalCode,
    date: moment().format("YYYY-MM-DD"),
    time: moment().format("HH:mm:ss a"),
    doneStatus: false,
    paymentStatus: req.body.data.paymentStatus
      ? req.body.data.paymentStatus
      : false,
    orderConfirmation: false,
    paymentAmmount: req.body.data.paymentAmmount,
    frameName: req.body.data.frame,
    files: req.body.data.images,
  });
  newOrder.save();
  const newCustomer = new Customer({
    fullName: req.body.data.address.fullName,
    phoneNumber: req.body.data.address.phoneNumber,
    address: req.body.data.address.address1,
    city: req.body.data.address.city,
    date: moment().format("MM ddd, YYYY HH:mm:ss a"),
  });
  newCustomer.save();
};

exports.getAllOrderList = (req, res) => {
  Order.find()
    .then((result) => {
      res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      console.log("error", error);
    });
};

exports.updateOrderCompletedStatus = (req, res) => {
  Order.findByIdAndUpdate(
    { _id: req.body.id },
    {
      doneStatus: req.body.doneStatus,
    }
  )
    .then((result) => {
      res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(401).json({ message: "Error", data: error });
    });
};
exports.orderConfirmation = (req, res) => {
  Order.findByIdAndUpdate(
    { _id: req.body.id },
    {
      orderConfirmation: req.body.orderConfirmation,
    }
  )
    .then((result) => {
      res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(401).json({ message: "Error", data: error });
    });
};

exports.deleteOrder = (req, res) => {
  console.log("id", req.body);
  Order.findByIdAndDelete({ _id: req.body.id })
    .then((result) => {
      res.status(200).json({
        status: "Success",
        message: "Order deleted successfully",
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
