// Using the User model, retrieve data and respond data
const User = require("../models/user");

module.exports.login = (req, res) => {
  res.render("users/login");
};

module.exports.register = (req, res) => {
  res.render("users/register");
};

module.exports.createUser = (req, res) => {
  const { username, phoneNumber, password } = req.body;
  const user = new User({ username, phoneNumber, password });
  user
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));

  req.flash("success", "Successfully registered! Please login.");
  res.redirect("/");
};
