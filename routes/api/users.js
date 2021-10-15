const express = require("express");

const { joiSchema } = require("../../models/user");
const {
  errorCatchWrapper,
  validation,
  auth,
  uploadMware,
} = require("../../middlewares");

const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.post(
  "/signup",
  errorCatchWrapper(validation(joiSchema)),
  errorCatchWrapper(ctrl.signup)
);
router.post(
  "/login",
  errorCatchWrapper(validation(joiSchema)),
  errorCatchWrapper(ctrl.login)
);
router.post("/logout", auth, errorCatchWrapper(ctrl.logout));
router.get("/logout", auth, errorCatchWrapper(ctrl.logout));
router.get("/current", auth, errorCatchWrapper(ctrl.info));

router.patch(
  "/avatars",
  auth,
  uploadMware.single("avatar"),
  errorCatchWrapper(ctrl.avatar)
);

router.get("/avatars", auth, async (req, res) => {
  res.status(200).json({
    status: "200 OK",
    code: "200",
    "Content-Type": "application / json",
    ResponseBody: { avatarURL: req.user.avatarURL },
  });
});

router.get("/verify/:verifyToken", errorCatchWrapper(ctrl.verify))

module.exports = router;
