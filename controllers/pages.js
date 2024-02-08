module.exports.index = (req, res) => {
  // check userType and redirect to appropriate page
  try {
    if (req.user.userType && req.user.userType === "admin") {
      return res.redirect("/admin");
    } else if (req.user.userType === "canteenWorker") {
      return res.redirect("/canteenWorker");
    } else if (req.user.userType === "parent") {
      return res.redirect("/parent");
    } else {
      res.render("index");
    }
  } catch (e) {
    console.log(e);
  }

  res.render("index");
};

module.exports.parentIndex = (req, res) => {
  res.render("parent/parentPortal");
};
