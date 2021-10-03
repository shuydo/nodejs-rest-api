const { User } = require("../../models");

const logout = async (req, res) => {
  // console.log(req.user);
  const {_id}=req.user
  await User.findByIdAndUpdate(_id,{token:null})
  res.json({
    status:"success",
    code:200,
    message:"Succes logout"
  })
};

module.exports = logout;
