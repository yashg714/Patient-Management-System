const Appointment = require('../models/appointment');
const User = require('../models/user');
const Patient = require('../models/patient');

// Create an appointment (Patients and Admins only)
const createAppointment = async (req, res) => {
  try {
    const { doctorEmail, date, notes } = req.body;

    // Verify the requester role
    if (req.user.role === 'Doctor') {
      return res.status(403).json({ message: 'Doctors cannot create appointments' });
    }

    // Verify the doctor exists and is valid
    const doctor = await User.findOne({ email: doctorEmail, role: 'Doctor' });
    if (!doctor) {
      return res.status(400).json({ message: 'Invalid doctor email' });
    }

    const patientEmail = req.user.role === 'Patient' ? req.user.email : req.body.patientEmail;
    const patient = await Patient.findOne({ email: patientEmail });
    if (!patient) {
      return res.status(400).json({ message: 'Invalid patient email' });
    }

    const patientId = patient._id;
    const doctorId = doctor._id;

    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      email:patientEmail,
      date,
      notes,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get appointments (Patients for their own, Doctors for assigned, Admin for all)
const getAppointments = async (req, res) => {
  try {
    let filter = {};

    // Filter based on user role
    if (req.user.role === 'Patient') {
      filter.patient = req.user.email;
    } else if (req.user.role === 'Doctor') {
      filter.doctor = req.user.email;
    }

    const appointments = await Appointment.find(filter);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an appointment (Patients for their own, Doctors for assigned, Admin for all)
const updateAppointment = async (req, res) => {
  try {
    const { email } = req.params;

    const appointment = await Appointment.findOne({ email });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check access control
    if (
      (req.user.role === 'Patient' && appointment.patient !== req.user.email) ||
      (req.user.role === 'Doctor' && appointment.doctor !== req.user.email)
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedAppointment = await Appointment.findOneAndUpdate(
      { email },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an appointment (Patients for their own, Admin for all)
const deleteAppointment = async (req, res) => {
  try {
    const { email } = req.params;

    const appointment = await Appointment.findOne({ email });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check access control
    if (
      (req.user.role === 'Patient' && appointment.patient !== req.user.email) ||
      req.user.role === 'Doctor'
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Appointment.findOneAndDelete({ email });
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
