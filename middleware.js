module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in first!");
    return res.redirect("/");
  }
  next();
};

module.exports.isParent = (req, res, next) => {
  if (typeof req.user === "undefined" || req.user.userType !== "parent") {
    return res.redirect("/");
  }
  next();
};

module.exports.isCanteenWorker = (req, res, next) => {
  if (
    typeof req.user === "undefined" ||
    req.user.userType !== "canteenWorker"
  ) {
    return res.redirect("/");
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (typeof req.user === "undefined" || req.user.userType !== "admin") {
    return res.redirect("/");
  }
  next();
};
