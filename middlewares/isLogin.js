module.exports = (req, res, next) => {
  const token = req.cookies.userToken;
  if (token) {
    return res.redirect("/");
  } else {
    next();
  }
};
