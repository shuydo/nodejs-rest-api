const express = require("express");
const router = express.Router();

const { joiSchema,updateFavoriteJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");
const { controllerWrapper, validation } = require("../../middlewares");

router.get("/", controllerWrapper(ctrl.listContacts));

router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post("/", validation(joiSchema), controllerWrapper(ctrl.addContact));

router.delete("/:contactId", controllerWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
