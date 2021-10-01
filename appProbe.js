// Shuydo ShuydoM0ng0 !ShuydoM0ng0

const mGoose = require("mongoose");
// console.log(mongoose);
// const dotenv=require('dotenv')
// console.log(process.env.DB_HOST);
// dotenv.config()
require("dotenv").config();

const { DB_HOST } = process.env;

mGoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Success connect to DB"))
  .catch(e => console.log(e.message));
