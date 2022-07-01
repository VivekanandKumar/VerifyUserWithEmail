const views = require("../controllers/viewController");
const viewRouter = require("express").Router();
const auth = require("../middlewares/auth");
const checkChange = require("../middlewares/changePass");
const isLogin = require("../middlewares/isLogin");

viewRouter.get("/", [auth, checkChange], views.home);
viewRouter.get("/register", isLogin, views.register);
viewRouter.get("/login", isLogin, views.login);
viewRouter.get("/changePassword", auth, views.changePass);
module.exports = viewRouter;
