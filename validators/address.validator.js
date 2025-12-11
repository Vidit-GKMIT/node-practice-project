const Joi = require("joi");

const validateAddress = (req, res, next) => {
  const addressSchema = Joi.object({
    user_id: Joi.number().required().messages({
      "number.base": "User id must be a number",
      "any.required": "User id is required",
      "numer.empty": "User id can not be empty"
    }),
    address_line1: Joi.string().max(100).required().messages({
      "string.base": "Adress Line 1 must be a string",
      "string.empty": "Adress Line 1 cannot be empty",
      "string.max": "Adress Line 1 cannot be more than 30 characters",
      "any.required": "Adress Line 1 is required"
    }),
    city: Joi.string().max(20).required().messages({
      "string.base": "City must be a string",
      "string.empty": "City cannot be empty",
      "string.max": "City cannot be more than 20 characters",
      "any.required": "City is required"
    }),

    state: Joi.string().max(20).required().messages({
      "string.base": "State must be a string",
      "string.empty": "State cannot be empty",
      "string.max": "State cannot be more than 20 characters",
      "any.required": "State is required"
    }),

    zip: Joi.string().max(6).required().messages({
      "string.base": "ZIP must be a string",
      "string.empty": "ZIP cannot be empty",
      "string.max": "ZIP cannot be more than 6 characters",
      "any.required": "ZIP is required"
    }),

    country: Joi.string().max(20).required().messages({
      "string.base": "Country must be a string",
      "string.empty": "Country cannot be empty",
      "string.max": "Country cannot be more than 20 characters",
      "any.required": "Country is required"
    })
  });
  const { error, value } = addressSchema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
      success: false
    });
  }

  req.validatedData = value;
  next();
};

const validateUpdateAddressData = (req, res, next) => {
  const addressSchema = Joi.object({
    address_line1: Joi.string().max(100).messages({
      "string.base": "Adress Line 1 must be a string",
      "string.empty": "Adress Line 1 cannot be empty",
      "string.max": "Adress Line 1 cannot be more than 30 characters"
    }),
    city: Joi.string().max(20).messages({
      "string.base": "City must be a string",
      "string.empty": "City cannot be empty",
      "string.max": "City cannot be more than 20 characters"
    }),

    state: Joi.string().max(20).messages({
      "string.base": "State must be a string",
      "string.empty": "State cannot be empty",
      "string.max": "State cannot be more than 20 characters"
    }),

    zip: Joi.string().max(6).messages({
      "string.base": "ZIP must be a string",
      "string.empty": "ZIP cannot be empty",
      "string.max": "ZIP cannot be more than 6 characters"
    }),

    country: Joi.string().max(20).messages({
      "string.base": "Country must be a string",
      "string.empty": "Country cannot be empty",
      "string.max": "Country cannot be more than 20 characters"
    })
  });
  const { error, value } = addressSchema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
      success: false
    });
  }

  req.validatedData = value;
  next();
};

module.exports = { validateAddress, validateUpdateAddressData };
