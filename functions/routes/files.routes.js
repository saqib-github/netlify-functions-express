const express = require("express");

const controllers = require("../controllers/files.controllers");

const router = express.Router();

router.post("/upload", controllers.addNewFile);
router.get("/getAll", controllers.getAllimages);
router.post("/deleteImage", controllers.deleteImage);
router.post("/update-cropped-image", controllers.updataCroppedImage);

module.exports = router;
