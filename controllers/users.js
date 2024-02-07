// Using the User model, retrieve data and respond data
const User = require("../models/user");

module.exports.login = (req, res) => {
  res.render("users/login");
};

module.exports.register = (req, res) => {
  res.render("users/register");
};

module.exports.createUser = async (req, res) => {
  try {
    const { username, phoneNumber, password } = req.body;
    const user = new User({ username, phoneNumber });
    await User.register(user, password);
    req.flash("success", "Successfully registered! Please login.");
    res.redirect("/");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/");
  }
};

module.exports.loginUser = (req, res) => {
  // by the time this function is called, passport.authenticate has already been called, so already logged in
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};
