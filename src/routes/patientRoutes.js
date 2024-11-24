const express = require('express');
const {
  createPatient,
  getPatientByEmail,
  updatePatientByEmail,
  deletePatientByEmail,
} = require('../controllers/patientController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

// Create a patient record (Doctor, Admin)
router.post('/', authenticate, authorize(['Doctor', 'Admin']), createPatient);

// Get a single patient record (Patient for own, Doctor for assigned patients, Admin for all)
router.get('/:email', authenticate, authorize(['Patient', 'Doctor', 'Admin']), getPatientByEmail);

// Update a patient record (Doctor for assigned patients, Admin for all)
router.put('/:email', authenticate, authorize(['Doctor', 'Admin']), updatePatientByEmail);

// Delete a patient record (Admin only)
router.delete('/:email', authenticate, authorize(['Admin']), deletePatientByEmail);

module.exports = router;
