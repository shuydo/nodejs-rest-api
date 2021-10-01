const { Schema, model } = require("mongoose");
const Joi = require("joi");

const text = { "any.required": "missing required name field (JOI)" };

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
const joiSchema = Joi.object({
  name: Joi.string().min(1).required().messages(text),
  email: Joi.string().email(),
  phone: Joi.string().min(1),
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  joiSchema,
  updateFavoriteJoiSchema,
  Contact,
};
