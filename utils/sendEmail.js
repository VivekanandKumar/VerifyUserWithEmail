const mailer = require("nodemailer");

const sendEmail = async (email, message) => {
  const transport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mail = {
    from: "Vivekanand Kumar<vicky.kumardev001@gmail.com>",
    to: email,
    subject: "Temp Password",
    html:
      "Your temporary password is <h1>" +
      message +
      "</h1><p>Use this password for initial changing the password</p>",
  };
  await transport.sendMail(mail);
};
module.exports = sendEmail;
