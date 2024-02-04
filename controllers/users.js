// Using the User model, retrieve data and respond data
const User = require("../models/user");

module.exports.login = (req, res) => {
  res.render("users/login");
};

module.exports.register = (req, res) => {
  res.render("users/register");
};

module.exports.createUser = (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });
  user
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};
