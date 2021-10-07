const { User } = require("../../models");

const info = async (req, res) => {
  const { _id } = req.user;
  const { email, subscription } = await User.findById(
    _id,
    "email subscription -_id"
  );

  res.json({
    status: "success",
    code: 200,
    email,
    subscription,
  });
};

module.exports = info;
