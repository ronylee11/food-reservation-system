require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user");
const Parent = require("../models/parent");
const Food = require("../models/food");

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
      "https://rasamalaysia.com/wp-content/uploads/2007/01/nasi_lemak-1-500x500.jpg",
    foodName: "Nasi Lemak",
    price: 3,
  });
  await food2.save();
  console.log("Nasi Lemak created");
};

seedDB().then(() => {
  mongoose.connection.close();
});
