const db = require("../models");
var fs = require("fs");
const { v4: uuidv4 } = require("uuid");
var fileExtension = require("file-extension");
var base64Img = require("base64-img");
// const faker = require("faker");
const Files = db.files;

exports.addNewFile = async (req, res) => {
  // console.log(req.headers.filesid);
  if (!req.files) {
    res.status(500).json({ message: "files not found" });
  } else {
    // ..................with headers logic for new images uploading start
    if (Array.isArray(req.files.images) && req.headers.filesid) {
      try {
        for (let i = 0; i < req.files.images.length; i++) {
          // image uploading to folder
          let myFile = req.files.images;
          let filePath = uuidv4();
          let Extention = fileExtension(myFile[i].name);
          let fileName = filePath.concat(".").concat(Extention);
          console.log("image name", fileName);
          console.log("this is files", myFile);
          await myFile[i].mv(
            `.${__dirname}functions/controllers/images/${fileName}`,
            function (err) {
              if (err) {
                console.log(err);
                return res.status(500).send({ msg: "eror", err: err });
              }
            }
          );
          // ...................
          try {
            await Files.findOneAndUpdate(
              { _id: req.headers.filesid },
              {
                $push: {
                  files: {
                    name: fileName,
                    imgUrl: `${process.env.SERVER_URL}/${fileName}`,
                  },
                },
              },
              { new: true, safe: true, upsert: true }
            )
              .then((result) => {
                // console.log("result", result);
              })
              .catch((error) => {
                console.log("error", error);
              });
          } catch (error) {
            console.log(error);
          }
          // ...................
        }
        //////////////////////////
        await Files.find()
          .then((result) => {
            console.log("asal files", result);
            return res.status(200).json({
              status: "Success",
              message: "photos uploaded successfully",
              data: result,
            });
          })
          .catch((error) => {
            console.log("error", error);
            return res.status(500).json({
              status: "Failed",
              message: "Database Error",
              data: error,
            });
          });
      } catch (error) {
        console.log("forloop error", error);
      }
    }
    // ......if end
    if (!Array.isArray(req.files.images) && req.headers.filesid) {
      let myFile = req.files.images;
      let filePath = uuidv4();
      let Extention = fileExtension(myFile.name);
      let fileName = filePath.concat(".").concat(Extention);
      await myFile.mv(
        `.${__dirname}functions/controllers/images/${fileName}`,
        function (err) {
          if (err) {
            console.log(err);
            return res.status(500).send({ msg: "eror", err: err });
          }
          try {
            Files.findOneAndUpdate(
              { _id: req.headers.filesid },
              {
                $push: {
                  files: {
                    name: fileName,
                    imgUrl: `${process.env.SERVER_URL}/${fileName}`,
                  },
                },
              },
              { new: true, safe: true, upsert: true }
            )
              .then((result) => {
                return res.status(201).json({
                  status: "Success",
                  message: "Resources Are Created Successfully",
                  data: result,
                });
              })
              .catch((error) => {
                return res.status(500).json({
                  status: "Failed",
                  message: "Database Error",
                  data: error,
                });
              });
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
    // ..................with headers logic for new images uploading start

    // ..................without headers logic for new images uploading start
    if (Array.isArray(req.files.images) && !req.headers.filesid) {
      // console.log("array", Array.isArray(req.files.images));
      var filesArray = [];
      for (let i = 0; i < req.files.images.length; i++) {
        // .......................
        let myFile = req.files.images;
        let filePath = uuidv4();
        let Extention = fileExtension(myFile[i].name);
        let fileName = filePath.concat(".").concat(Extention);
        await myFile[i].mv(
          `.${__dirname}functions/controllers/images/${fileName}`,
          function (err) {
            if (err) {
              console.log(err);
              return res.status(500).send({ msg: "eror", err: err });
            }
          }
        );
        filesArray.push({
          name: fileName,
          imgUrl: `${process.env.SERVER_URL}/${fileName}`,
        });
        /////////////////////
      }
      var newFiles = new Files({
        files: filesArray,
      });
      await newFiles.save();
      return res.status(200).json({
        status: "Success",
        message: "photos uploaded successfully",
        data: newFiles,
      });
    }
    // ......................
    if (!Array.isArray(req.files.images) && !req.headers.filesid) {
      console.log("object", Array.isArray(req.files.images));
      let myFile = req.files.images;
      let filePath = uuidv4();
      let Extention = fileExtension(myFile.name);
      let fileName = filePath.concat(".").concat(Extention);
      const newFile = new Files({
        files: {
          name: fileName,
          imgUrl: `${process.env.SERVER_URL}/${fileName}`,
        },
      });
      await newFile.save();
      await myFile.mv(
        `.${__dirname}functions/controllers/images/${fileName}`,
        function (err) {
          if (err) {
            console.log(err);
            return res.status(500).send({ msg: "eror", err: err });
          }
          return res.send({
            status: "Success",
            message: "photo uploaded successfully",
            data: newFile,
          });
        }
      );
    }
    // ..................without headers logic for new images uploading end
  }
};

exports.getAllimages = (req, res) => {
  if (req.headers.id === null) {
    console.log("id null");
    return res.status(500).json({ message: "files not found" });
  } else {
    // console.log("req", req.headers.id);
    Files.findOne({ _id: req.headers.id })
      .then((result) => {
        // console.log("imagesNames", result.files);
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  // res.status(200).json({ id: req.headers.id });
};
exports.deleteImage = (req, res) => {
  console.log("url", req.body.url);
  console.log("id", req.body.id);
  console.log("image name", req.body.imageName);
  //////////////////////////////
  try {
    Files.updateOne(
      { _id: req.body.id },
      {
        $pull: {
          files: {
            name: req.body.imageName,
            imgUrl: req.body.url,
          },
        },
      },
      { new: true, safe: true, upsert: true }
    )
      .then((result) => {
        return res.status(201).json({
          status: "Success",
          message: "Resources Are Created Successfully",
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: "Failed",
          message: "Database Error",
          data: error,
        });
      });
  } catch (error) {
    console.log(error);
  }
  ////////////////////////////
  try {
    fs.unlink("app/controllers/images/" + req.body.imageName, (err, result) => {
      // handler
      if (err) {
        console.log("eror", err);
      }
      console.log("file deleted");
    });
    //file removed
  } catch (err) {
    console.error(err);
  }
  /////////////////////////
};

// update cropped image
exports.updataCroppedImage = (req, res) => {
  // console.log("data", req.body.data);

  base64Img.img(
    req.body.data.croppedImageUrl,
    "app/controllers/images",
    uuidv4(),
    function (err, filepath) {
      const pathArr = filepath.split("/");
      const fileName = pathArr[pathArr.length - 1];
      console.log("fileName", fileName);
      if (err) {
        console.log("error", err);
      }
      console.log("filepath", filepath);

      Files.updateOne(
        { "files.name": req.body.data.imageName },
        {
          $set: {
            "files.$.name": fileName,
            "files.$.imgUrl": `${process.env.SERVER_URL}/${fileName}`,
          },
        }
      )
        .then((result) => {
          console.log("result", result);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  );

  try {
    fs.unlink(
      "app/controllers/images/" + req.body.data.imageName,
      (err, result) => {
        // handler
        if (err) {
          console.log("eror", err);
        }
        console.log("file deleted");
      }
    );
    //file removed
  } catch (err) {
    console.error(err);
  }
};
