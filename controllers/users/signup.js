const { User } = require("../../models"); // const { Conflict } = require("http-errors");

const signup = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({
      status: "error",
      code: 409, // message: "Already register",
      message: "Email in use",
    });
    return; //!!!!!!!!!
  }
  // if (user) throw new Conflict("Email in use");
  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();
  
  res.status(201).json({
    status: "success",
    code: 201,  // message: "Success register",
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signup;
