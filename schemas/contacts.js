const Joi = require("joi");

const text = { 'any.required': 'missing required name field (JOI)' };

const productSchema = Joi.object({
  name: Joi.string().min(1).required().messages(text),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(1),
});

module.exports = productSchema;
