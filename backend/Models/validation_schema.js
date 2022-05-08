const Joi = require('@hapi/joi');

const authSchema = Joi.object({
  bvn: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required('One or more of your request parameters failed validation. Please retry'),
});

module.exports = {
  authSchema,
};
