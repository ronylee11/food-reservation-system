module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in first!");
    return res.redirect("/");
  }
  next();
};

module.exports.isParent = (req, res, next) => {
  if (typeof req.user !== "undefined") {
    if (req.user.userType !== "parent") {
      req.flash("error", "You must be a parent to access this page!");
      return res.redirect("/");
    }
  }
  next();
};
