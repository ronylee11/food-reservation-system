require("dotenv").config(); // load environment variables // deploy
const express = require("express");
const mongoose = require("mongoose"); // connect database
// routes

const dbUrl =
  process.env.DB_URL || "mongodb://localhost:27017/food_reservation_system"; // 27017 is the default mongodb port
console.log(dbUrl);
mongoose.set("strictQuery", false); // disable deprecation warning
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

const app = require("./app");

let port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`App is running on ${port}!`);
});
