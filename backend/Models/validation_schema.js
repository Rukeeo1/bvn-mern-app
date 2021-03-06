const Joi = require('@hapi/joi');

const authSchema = Joi.object({
  text: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = {
  authSchema,
};
