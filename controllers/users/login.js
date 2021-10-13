const { BadRequest } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "_id email password");
  if (!user || !user.comparePassword(password))
    throw new BadRequest("Invalid email or password");
  const { _id } = user;
  console.log("_id_", _id);

  const payload = {
    _id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, { token });

  res.json({
    status: "success",
    code: 200,
    data: { token },
  });
};

module.exports = login;
