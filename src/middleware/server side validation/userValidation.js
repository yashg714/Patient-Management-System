const Joi = require('joi');

// Validation schema for creating a user
const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be less than 50 characters',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  password: Joi.string().min(8).max(30).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password must be less than 30 characters',
  }),
  role: Joi.string().valid('Patient', 'Doctor', 'Admin').required().messages({
    'string.empty': 'Role is required',
    'any.only': 'Role must be one of Patient, Doctor, or Admin',
  }),
});

// Validation schema for updating a user
const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be less than 50 characters',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Invalid email format',
  }),
  role: Joi.string().valid('Patient', 'Doctor', 'Admin').messages({
    'any.only': 'Role must be one of Patient, Doctor, or Admin',
  }),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};

  