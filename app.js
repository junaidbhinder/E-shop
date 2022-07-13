require("dotenv").config();
const db = require("./config/db");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const categoryroutes = require("./routes/category.routes");
const productrouts = require("./routes/product.routes");
const userroutes = require("./routes/user.routes");
let morgan = require("morgan");
app.use(
  bodyParser.json({
    limit: "100mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
  })
);
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to server",
  });
});
app.use("/categoryadd", categoryroutes);
app.use("/products", productrouts);
app.use("/user", userroutes);
app.listen(process.env.PORT, () =>
  console.log("server is running", process.env.PORT)
);
