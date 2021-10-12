const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../tmp");

const storage = multer.diskStorage({
  destination: (_, __, next) => next(null, tmpDir),
  filename: (_, file, next) => next(null, file.originalname),
});
const limits = { fileSize: 2*1024*1024 };

const uploadMware = multer({ storage });

module.exports = uploadMware;
