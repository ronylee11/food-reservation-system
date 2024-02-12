const Parent = require("../models/parent");

module.exports.userData = (req, res) => {
    res.render("admin/userData");
  };
  
  module.exports.viewWithdraw = (req, res) => {
    res.render("admin/viewWithdraw");
  };
  
  module.exports.viewPayment = (req, res) => {
    res.render("admin/viewPayment");
  };
  
  module.exports.viewTopUp = (req, res) => {
    res.render("admin/viewTopUp");
  };
  
  module.exports.menuUpdate = (req, res) => {
    res.render("admin/menuUpate");
  };
  
  module.exports.viewTopUp = async (req, res) => {
    try {
      const topUpHistory = await Parent.find({}, { _id: 0, user: 1, transactionHistory: 1 }).populate('user', 'username');
      res.render("admin/viewTopUp", { topUpHistory });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error" + error.message);
    }
  };