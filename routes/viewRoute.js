const views = require("../controllers/viewController");
const viewRouter = require("express").Router();
const auth = require("../middlewares/auth");
const checkChange = require("../middlewares/changePass");

viewRouter.get("/", [auth, checkChange], views.home);
viewRouter.get("/register", views.register);
viewRouter.get("/login", views.login);
viewRouter.get("/changePassword", auth, views.changePass);
module.exports = viewRouter;
