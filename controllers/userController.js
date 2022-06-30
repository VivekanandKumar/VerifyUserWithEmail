const Users = require("../models/Users");
const sendEmail = require("../utils/sendEmail");
const { hash, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.json({ message: "All fields are required" });
  }
  try {
    const isUser = await Users.findOne({ email });
    if (isUser) {
      return res.json({ message: "Email already Exist.." });
    }
    const pass = Math.random().toString(36).substring(2, 15);
    await sendEmail(email, pass);
    const hashPassword = await hash(pass, 10);
    await Users.create({ name, email, password: hashPassword });
    res.redirect("/login");
  } catch (err) {
    throw err;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "All fields are required" });
  }
  try {
    const isUser = await Users.findOne({ email });
    if (!isUser) {
      return res.json({ message: "Invalid Credentials" });
    }
    const passMatched = await compare(password, isUser.password);
    if (!passMatched) {
      return res.json({ message: "Invalid Credentials" });
    }
    const token = await sign({ id: isUser._id }, process.env.TOKEN_SECRET);
    res.cookie("userToken", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });
    return res.redirect("/");
  } catch (error) {
    throw err;
  }
};

const changePassword = async (req, res) => {
  const token = req.cookies.userToken;
  const { oldpass, newpass } = req.body;
  if (!oldpass || !newpass) {
    return res.json({ message: "All fields are required" });
  }
  try {
    const user = await verify(token, process.env.TOKEN_SECRET);
    const currentUser = await Users.findById(user.id);
    const passwordMatched = await compare(oldpass, currentUser.password);
    if (!passwordMatched) {
      return res.json({
        message: "Old password is not matched with our record",
      });
    }
    const hashPassword = await hash(newpass, 10);
    currentUser.password = hashPassword;
    currentUser.passwordChanged = true;
    await currentUser.save();
    return res.redirect("/");
  } catch (error) {
    throw err;
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken");
  return res.redirect("/login");
};
module.exports = { signup, login, changePassword, logout };
