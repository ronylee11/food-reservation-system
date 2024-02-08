module.exports.index = (req, res) => {
  res.render("index");
};

module.exports.parentIndex = (req, res) => {
  res.render("parent/parentPortal");
};
