const express = require("express");
const serverless = require("serverless-http");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const router = express.Router();




app.use(cors("*"));
app.options("*", cors());


// importing routes here
const authRoute = require("../functions/routes/auth.routes");
const filesUpload = require("../functions/routes/files.routes");
const ordersPlace = require("../functions/routes/orders.routes");
const customers = require("../functions/routes/customers.routes");
const total_orders = require("../functions/routes/total_orders.routes");



var dir = path.join(__dirname, "./app/controllers/images");

// app middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(express.static(dir));





// routes middlewares
app.use("/.netlify/functions/api/auth", authRoute);
app.use("/.netlify/functions/api/files", filesUpload);
app.use("/.netlify/functions/api/orders", ordersPlace);
app.use("/.netlify/functions/api/customers", customers);
app.use("/.netlify/functions/api/total", total_orders);
// // importing models
const db = require("../functions/models/index");

// // connecting to database
db.mongoose
  .connect(
    "mongodb+srv://stickable-shop:stickable123@cluster0.pzjpw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully Connected to database");
    // initial();
  })
  .catch((err) => {
    console.log("Failed to connect to database", err);
    process.exit();
  });
router.get("/", (req, res) => {
  console.log(process.env.DB_URL);
  console.log("edchjevqwc");
  res.json({ message: "Hosting node backend successfully !!" });
});
app.use("/.netlify/functions/api", router);

module.exports = app;
module.exports.handler = serverless(app);

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// var path = require("path");
// const fileUpload = require("express-fileupload");
// require("dotenv").config();
// const app = express();

// app.use(cors("*"));
// app.options("*", cors());
// // importing routes here
// const authRoute = require("./app/routes/auth.routes.js");
// const filesUpload = require("./app/routes/files.routes");
// const ordersPlace = require("./app/routes/orders.routes");
// const customers = require("./app/routes/customers.routes");
// const total_orders = require("./app/routes/total_orders.routes");

// // creating app

// var dir = path.join(__dirname, "./app/controllers/images");

// // app middlewares
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(fileUpload());
// app.use(express.static(dir));

// // this will run when anyone request on app
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to starter template" });
// });

// // // importing models
// const db = require("../functions/models/index");

// // // connecting to database
// db.mongoose
//   .connect(`${process.env.DB_URL}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Successfully Connected to database");
//     // initial();
//   })
//   .catch((err) => {
//     console.log("Failed to connect to database", err);
//     process.exit();
//   });

// // set port and listen
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is runing on ${PORT}`);
// });

// // routes middlewares
// app.use("/api/auth", authRoute);
// app.use("/api/files", filesUpload);
// app.use("/api/orders", ordersPlace);
// app.use("/api/customers", customers);
// app.use("/api/total", total_orders);
