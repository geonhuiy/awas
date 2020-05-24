const express = require("express");
const app = express();
const db = require("./utils/db");
require("dotenv").config();
const bodyParser = require('body-parser');
const jwt = require('./utils/jwt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const userRoute = require("./route/userRoute");
app.use("/user", userRoute);
app.use(jwt());

db.on("connected", () => {
  app.listen(process.env.PORT);
})
