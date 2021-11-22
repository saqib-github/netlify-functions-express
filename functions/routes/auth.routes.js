
const express = require("express");

// const { verifySignUp } = require("../middlewares");

const controller = require("../controllers/auth.controllers");
const middlewares = require("../middlewares/authJwt");


const router = express.Router();

router.post("/signup", [middlewares.duplicateEmail], controller.signup);
router.post("/signin", controller.signin);

module.exports = router;
