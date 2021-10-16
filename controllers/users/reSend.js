const { User } = require("../../models/user");
const { sendMail, sendSuccesRes } = require("../../helpers");
const { BadRequest } = require("http-errors");

const reSend = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new BadRequest("Missing required field email");
  const user = await User.findOne({ email });
  const { verify, verifyToken } = user;
  if (verify || !verifyToken)
    throw new BadRequest("Verification has already been passed");
  const data = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}" target="_blank"> Подтвердить почту </a>`,
  };
  await sendMail(data);
  sendSuccesRes(res, { message: "Verification email sent" }, 200);
};

module.exports = reSend;
