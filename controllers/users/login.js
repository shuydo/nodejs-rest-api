const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "_id email password subscription");

  if (!user || !user.comparePassword(password)) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: `Email or password is wrong`,
    });
    return;
  }

  const { _id, subscription } = user;
  const payload = {
    _id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, { token });
  res.json({
    status: "success",
    code: 200,
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = login;
