//require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user");

dbUrl =
  process.env.DB_URL || "mongodb://localhost:27017/food_reservation_system";
mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

const seedDB = async () => {
  // clear all users
  await User.deleteMany({});

  // create admin user
  const user = new User({
    username: "admin",
    userType: "admin",
    phoneNumber: 1234567890,
  });
  await User.register(user, "admin");
  console.log("Admin user created");

  // create 3 canteen worker user
  await User.register(
    new User({
      username: "canteenWorker1",
      userType: "canteenWorker",
      phoneNumber: 1234567890,
    }),
    "canteenWorker1"
  );
  console.log("Canteen worker 1 created");
  await User.register(
    new User({
      username: "canteenWorker2",
      userType: "canteenWorker",
      phoneNumber: 1234567890,
    }),
    "canteenWorker2"
  );
  console.log("Canteen worker 2 created");
  await User.register(
    new User({
      username: "canteenWorker3",
      userType: "canteenWorker",
      phoneNumber: 1234567890,
    }),
    "canteenWorker3"
  );
  console.log("Canteen worker 3 created");
};

seedDB().then(() => {
  mongoose.connection.close();
});
