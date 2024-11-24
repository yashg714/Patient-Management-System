const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
} = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const validate = require('../middleware/server side validation/validationMiddleware')
const { createUserSchema, updateUserSchema } = require('../middleware/server side validation/userValidation');

const router = express.Router();

// Create a new user (Admin only)
router.post('/', authenticate ,authorize(['Admin']),validate(createUserSchema), createUser);

// Get all users (Admin only)
router.get('/', authenticate ,authorize(['Admin']), getAllUsers);

// Get a single user by email (Admin only)
router.get('/:email', authenticate, authorize(['Admin']), getUserByEmail);

// Update a user by email (Admin only)
router.put('/:email', authenticate, authorize(['Admin']),validate(updateUserSchema), updateUserByEmail);

// Delete a user by email (Admin only)
router.delete('/:email', authenticate, authorize(['Admin']), deleteUserByEmail);

module.exports = router;
