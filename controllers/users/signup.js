const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { sendMail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw new Conflict("Email in use");
  const verifyToken = nanoid();
  const newUser = new User({ email, verifyToken });
  newUser.setPassword(password);
  await newUser.save();

  const data = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}" target="_blank"> Подтвердить почту </a>`,
  };

  await sendMail(data);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};
module.exports = signup;
