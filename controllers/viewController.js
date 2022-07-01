const home = (req, res) => {
  const user = req.user;
  res.render("homepage", { user });
};
const register = (req, res) => {
  res.render("register");
};
const login = (req, res) => {
  res.render("login");
};

const changePass = (req, res) => {
  res.render("changePassword");
};

module.exports = { home, register, login, changePass };
