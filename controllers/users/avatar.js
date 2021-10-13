const path = require("path");
const { nanoid } = require("nanoid");
const fs = require("fs/promises");
var gimp = require("jimp");

const { User } = require("../../models");

const destDir = path.join(__dirname, "../../public");

const avatar = async (req, res) => {
  const { originalname, path: tmpName } = req.file;
  const ext = originalname.split(".").reverse()[0];
  const dbFileName = `${nanoid(10)}.${ext}`;
  const image = path.join("avatars", dbFileName);
  const fileName = path.join(destDir, "avatars", dbFileName);

  try {
    const { _id } = req.user;

    const cropFile = path.join(__dirname, "../../tmp/crop.jpg");

    await gimp
      .read(tmpName)
      .then(res => res.resize(gimp.AUTO, 250).cover(250, 250).write(cropFile))
      .catch(err => console.error(err.message));

    await fs.rename(cropFile, fileName);

    await User.findByIdAndUpdate(_id, { avatarURL: image });

    res.json({
      status: "200 OK",
      "Content-Type": "application / json",
      ResponseBody: { avatarURL: image },
    });
    await fs.unlink(cropFile);
  } catch (e) {
    await fs.unlink(tmpName);
  }
};
module.exports = avatar;
