const express = require('express');
const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

// Create an appointment (Patients and Admins)
router.post('/', authenticate, authorize(['Patient', 'Admin']), createAppointment);

// Get appointments (Patients: own, Doctors: assigned, Admin: all)
router.get('/', authenticate, authorize(['Patient', 'Doctor', 'Admin']), getAppointments);

// Update an appointment (Patients: own, Doctors: assigned, Admin: all)
router.put('/:email', authenticate, authorize(['Patient', 'Doctor', 'Admin']), updateAppointment);

// Delete an appointment (Patients: own, Admin: all)
router.delete('/:email', authenticate, authorize(['Patient', 'Admin']), deleteAppointment);

module.exports = router;
