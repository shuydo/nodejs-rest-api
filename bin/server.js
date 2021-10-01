const mGoose = require("mongoose");

require("dotenv").config();

const app = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;

mGoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {});
    console.log("Database connection successful");
  })
  .catch(e => {
    console.log(e.message);
    process.exit(1);
  });
