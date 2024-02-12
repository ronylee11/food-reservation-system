require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user");
const Parent = require("../models/parent");
const Food = require("../models/food");
const Admin = require("../models/admin");
const CanteenWorker = require("../models/canteenWorker");

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
  await Parent.deleteMany({});
  await Food.deleteMany({});

  // create admin user
  const adminUser = new User({
    username: "admin",
    userType: "admin",
    phoneNumber: 1234567890,
  });
  await User.register(adminUser, "admin");
  await Admin.create({
    user: adminUser._id,
  });
  console.log("Admin user created");

  // create canteen worker user
  const canteenWorker = new User({
    username: "canteenWorker",
    userType: "canteenWorker",
    phoneNumber: 1234567890,
  });
  await User.register(canteenWorker, "canteenWorker");
  await CanteenWorker.create({
    user: canteenWorker._id,
  });
  console.log("Canteen worker created");

  // create 2 food, nasi lemak and fried noodle
  const food1 = new Food({
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuwzOJ8VtHMt625BYE5i3EzN309PeftdhJyA&usqp=CAU",
    foodName: "Fried Noodle",
    price: 5,
  });
  await food1.save();
  console.log("Fried Noodle created");

  const food2 = new Food({
    imageUrl:
      "https://qph.cf2.quoracdn.net/main-qimg-9c928433f921982fc3ad6fd986db60c8",
    foodName: "Nasi Lemak",
    price: 3,
  });
  await food2.save();
  console.log("Nasi Lemak created");
};

seedDB().then(() => {
  mongoose.connection.close();
});
