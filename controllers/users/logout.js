const { User } = require("../../models");
const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.json({ Status: "204 No Content" });
};
module.exports = logout;