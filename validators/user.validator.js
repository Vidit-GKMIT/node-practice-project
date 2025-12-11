const Joi = require("joi");

const validateUser = (req, res, next) => {
  const userSchema = Joi.object({
    name: Joi.string().max(30).required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
      "string.max": "Name cannot be more than 30 characters",
      "any.required": "Name is required"
    }),

    email: Joi.string().email().max(40).required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.max": "Email cannot be more than 40 characters",
      "any.required": "Email is required",
      "string.email": "Please enter a valid email address"
    }),

    contact: Joi.string().max(10).required().messages({
      "string.base": "Contact must be a string",
      "string.empty": "Contact cannot be empty",
      "string.max": "Contact cannot be more than 10 numbers",
      "any.required": "Contact is required"
    })
  });
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.details.map((err) => err.message),
      success: false
    });
  }
  req.validatedData = value;
  next();
};

const validateUpdateUserData = (req, res, next) => {
  const userSchema = Joi.object({
    name: Joi.string().max(30).messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
      "string.max": "Name cannot be more than 30 characters"
    }),

    contact: Joi.string().max(10).messages({
      "string.base": "Contact must be a string",
      "string.empty": "Contact cannot be empty",
      "string.max": "Contact cannot be more than 10 numbers"
    })
  });
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.details.map((err) => err.message),
      success: false
    });
  }
  req.validatedData = value;
  next();
};

module.exports = { validateUser, validateUpdateUserData };
