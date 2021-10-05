const express = require("express");

const { joiSchema } = require("../../models/user");
const { controllerWrapper, validation, auth } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.post("/logout", auth, controllerWrapper(ctrl.logout));

router.get("/current", auth, controllerWrapper(ctrl.info));

module.exports = router;
