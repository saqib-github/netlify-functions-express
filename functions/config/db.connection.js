"use strict";

const mongoose = require("mongoose");

let conn = null;

const uri =
  "mongodb+srv://stickable-shop:stickable123@cluster0.pzjpw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

exports.connect = async function () {
  if (conn == null) {
    conn = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => mongoose);

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn;
  }
  if (conn) {
    console.log("db connectede", conn);
  }
  return conn;
};
