// Shuydo ShuydoM0ng0 !ShuydoM0ng0
//mongodb+srv://Shuydo:<password>@cluster0.67xei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const { Schema, model } = require("mongoose");
// const categorySchema = ({
//   name: String,
// });
// const Category = model("category", categorySchema);

const { DB_HOST } = process.env;
const contactsRouter = require("./routes/api/contacts");

// const newCategory = {
//   name: "Iosif",
//   phone: 1111111,
// };

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use("/api/products", productsRouter);
//api/product

app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message });
// });

module.exports = app;
