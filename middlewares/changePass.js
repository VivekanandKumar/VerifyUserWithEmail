const Users = require("../models/Users");
const change = async (req, res, next) => {
  const id = req.userId;
  try {
    if (id) {
      const user = await Users.findById(id);
      if (user.passwordChanged) {
        req.user = user;
        next();
      } else {
        return res.redirect("/changePassword");
      }
    } else {
      return res.json({ message: "Invalid User" });
    }
  } catch (err) {
    return res.json({ ChangePassword: "Something went wrong !" });
  }
};
module.exports = change;
