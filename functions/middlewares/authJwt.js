const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const db = require("../models/index");
// const faker = require("faker");
const User = db.user;

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
exports.duplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    if (user) {
      res.status(404).json({ message: "user has already registered" });
    } else {
      next();
    }
  });
};
