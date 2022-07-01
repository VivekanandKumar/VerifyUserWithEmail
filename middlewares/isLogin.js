module.exports = (req, res, next) => {
  const token = req.cookies.userToken;
  console.log("Triggered");
  if (token) {
    return res.redirect("/");
  } else {
    next();
  }
};
