const info = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    status: "success",
    code: 200,
    email,
    subscription,
  });
};

module.exports = info;
