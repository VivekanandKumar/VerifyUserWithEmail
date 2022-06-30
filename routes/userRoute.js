const userRouter = require("express").Router();
const users = require("../controllers/userController");
const auth = require("../middlewares/auth");
userRouter.post("/register", users.signup);
userRouter.post("/login", users.login);
userRouter.post("/changePassword", users.changePassword);
userRouter.get("/logout", auth, users.logout);
module.exports = userRouter;
