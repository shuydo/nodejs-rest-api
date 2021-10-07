const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({
      status: "error",
      code: 409,
      message: "Email in use",
    });
    return;
  }
  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

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
