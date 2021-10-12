const express = require("express");
const router = express.Router();

const { joiSchema, updateFavoriteJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");
const { errorCatchWrapper, validation, auth } = require("../../middlewares");

// router.get("/", errorCatchWrapper(ctrl.listContacts));

// router.get("/:contactId", errorCatchWrapper(ctrl.getContactById));

// router.post("/", validation(joiSchema), errorCatchWrapper(ctrl.addContact));

// router.delete("/:contactId", errorCatchWrapper(ctrl.removeContact));

// router.put(
//   "/:contactId",
//   validation(joiSchema),
//   errorCatchWrapper(ctrl.updateContact)
// );

// router.patch(
//   "/:contactId/favorite",
//   validation(updateFavoriteJoiSchema),
//   errorCatchWrapper(ctrl.updateStatusContact)
// );

router.post(
  "/",
  auth,
  validation(joiSchema),
  errorCatchWrapper(ctrl.addContact)
);

router.get("/", auth,errorCatchWrapper(ctrl.getContactsByUser));


module.exports = router;
