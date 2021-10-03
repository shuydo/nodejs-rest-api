const { NotFound, BadRequest } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  // console.log("in login");
  const { email, password } = req.body;

  const user = await User.findOne({ email }, "_id email password subscription");

  // console.log(user);

  if (!user || !user.comparePassword(password)) {
    //   throw new BadRequest("Invalid email or password");
    res.status(401).json({
      status: "error",
      code: 401,
      message: `Email or password is wrong`,
    });
    return;
  }
  // if (!user) {
  //   // throw new NotFound(`Email ${email} not found`);

  //   res.status(404).json({
  //     status: "error",
  //     code: 404,
  //     message: `Email ${email} not found`,
  //   });
  //   return;
  // }
  // if (!user.comparePassword(password)) {
  //   // throw new BadRequest("Invalid password");
  // // if (!bcrypt.compareSync(password, user.password)) {
  //   // throw new BadRequest("Invalid password");
  //   res.status(400).json({
  //     status: "error",
  //     code: 400,
  //     message: "Invalid password",
  //   });
  //   return;
  // }

  // console.log("user:", user);

  const { _id, subscription } = user;
  const payload = {
    _id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  // const token=user.createToken()
  // console.log(token);
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
