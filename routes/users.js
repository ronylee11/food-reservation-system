const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn } = require("../middleware");
const user = require("../controllers/users");

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
