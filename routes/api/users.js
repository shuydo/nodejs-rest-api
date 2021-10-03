const express = require("express");

const { joiSchema } = require("../../models/user");
const {
  controllerWrapper,
  validation,
  // authenticate,
} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
// console.log("authenticate:", authenticate);

const router = express.Router();
// 1 reg(signup) 2 authentif(login) 3 autor 4 logout
// console.log("in routs auth:", ctrl);
//signup
router.post(
  "/signup",
  validation(joiSchema),
  controllerWrapper(ctrl.signup)
);

//signin
router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

//signout
// router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

module.exports = router;
