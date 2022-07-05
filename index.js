require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoute");
require("./database/connection");
const viewRoutes = require("./routes/viewRoute");
const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());
// Routes Defined
app.use(viewRoutes);
app.use(userRoutes);

// server configuration
const PORT = process.env.PORT || 2001;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server listen on port ${PORT}`);
});
