const home = (req, res) => {
  const user = req.user;
  res.render("homepage", { user });
};
const register = (req, res) => {
  const token = req.cookies.userToken;
  if (token) {
    return res.redirect("/");
  }
  res.render("register");
};
const login = (req, res) => {
  const token = req.cookies.userToken;
  if (token) {
    return res.redirect("/");
  }
  res.render("login");
};

const changePass = (req, res) => {
  res.render("changePassword");
};

module.exports = { home, register, login, changePass };
