const { verify } = require("jsonwebtoken");
const validateUser = (req, res, next) => {
  const token = req.cookies.userToken;
  try {
    if (token) {
      const user = verify(token, process.env.TOKEN_SECRET);
      req.userId = user.id;
      next();
    } else {
      return res.redirect("/login");
    }
  } catch (err) {
    return res.json({ Auth: "Something went wrong!" });
  }
};

module.exports = validateUser;
