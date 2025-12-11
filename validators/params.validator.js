const Joi = require("joi");

const validateParams = (req, res, next) => {
  const paramsSchema = Joi.object({
    page: Joi.number().integer().min(1).optional().messages({
      "number.integer": "The page value must be a integer",
      "number.min": "The page value must be greater than or equal to 1",
      "number.base": "The page value must be a number"
    }),

    limit: Joi.number().integer().min(1).max(20).optional().messages({
      "number.integer": "The limit value must be a integer",
      "number.min": "The limit value must be positive",
      "number.base": "The limit value must be a number",
      "number.max": "The limit value must not be more than 20"
    })
  });
  const { error, value } = paramsSchema.validate(req.query, {
    abortEarly: false
  });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.details.map((err) => err.message),
      success: false
    });
  }
  req.validatedParams = value;
  next();
};

module.exports = validateParams;
