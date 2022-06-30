const { connect } = require("mongoose");

module.exports = connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected :)");
  })
  .catch(() => {
    console.log("Something wrong while database connection !!");
  });
