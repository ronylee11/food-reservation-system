module.exports.index = (req, res) => {
  // check userType and redirect to appropriate page
  try {
    if (typeof req.user !== "undefined") {
      if (req.user.userType && req.user.userType === "admin") {
        res.render("admin/index");
      } else if (req.user.userType === "canteenWorker") {
        res.render("canteenWorker/index");
      } else if (req.user.userType === "parent") {
        res.render("parent/index");
      } else {
        res.render("index");
      }
    }
  } catch (e) {
    console.log(e);
  }

  res.render("index");
};
