const nMailer = require("nodemailer");
require("dotenv").config();

const { PASSU } = process.env;

const nMailerConf = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "shuydo@ukr.net",
    pass: PASSU,
  },
};

const transporter = nMailer.createTransport(nMailerConf);

const sendMail = async data => {
  const email = { ...data, from: "shuydo@ukr.net" };
  await transporter.sendMail(email);
  // .then(() => console.log("Successs"))
  // .catch(e => console.log(e.message));
};

module.exports = sendMail;
