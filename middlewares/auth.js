const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../models");
const { SECRET_KEY } = process.env;
const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Unauthorized();
    const [b, token] = authorization.split(" ");
    if (b !== "Bearer") throw new Unauthorized();
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(_id);
    if (!user.token) throw new Unauthorized();
    if (user.token !== token) throw new Unauthorized();
    req.user = user;
    next();
  } catch (e) {
    res.json({
      status: "error",
      code: "401",
      message: "Not authorized",
    });
  }
};
module.exports = auth;
