const User = require('../models/user');
const bcrypt = require('bcrypt');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({message:"User Created Successfully."});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).select('-password'); // Exclude password from the response

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by email
const updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { name, role } = req.body;

    // Update the user
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, role },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from the response

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user by email
const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
};
