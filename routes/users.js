const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn } = require("../middleware");
const user = require("../controllers/users");



const User = require("../models/user");

router.get("/userData", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.render("userData", { users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router
    .route("/register")
    .get(user.register)
    .post(user.createUser);

router
  .route("/login")
  .get(user.login)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
      keepSessionInfo: true,
    }),
    user.loginUser
  );

router.post("/logout", isLoggedIn, user.logoutUser);

module.exports = router;
