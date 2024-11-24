const Patient = require('../models/patient');
const User = require('../models/user');

// Create a patient record (Doctor and Admin only)
const createPatient = async (req, res) => {
  try {
    const { name, email, age, address, doctorMailId } = req.body;

    // Ensure the assigned doctor exists
    const doctor = await User.findOne({ email: doctorMailId, role: 'Doctor' });

    if (!doctor) {
      return res.status(400).json({ message: 'Assigned doctor is not valid' });
    }

    const assignedDoctor = doctor._id; 
    // Create a new patient record
    const patient = await Patient.create({ name, email, age, address, assignedDoctor });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single patient record (Patient for own, Doctor for assigned patients, Admin for all)
const getPatientByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Find the patient by email
    const patient = await Patient.findOne({ email }).populate('assignedDoctor', 'name email');
    console.log("patient:-",patient)
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Access control based on the role
    if (req.user.role === 'Patient' && req.user.email !== email) {
      return res.status(403).json({ message: 'Access denied' });
    }
    if (req.user.role === 'Doctor' && String(patient.assignedDoctor.email) !== req.user.email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a patient record (Doctor for assigned patients, Admin for all)
const updatePatientByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { name, age, address } = req.body;

    // Find the patient by email
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Access control based on the role
    if (req.user.role === 'Doctor' && String(patient.assignedDoctor.email) !== req.user.email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update patient record
    const updatedPatient = await Patient.findOneAndUpdate(
      { email },
      { name, age, address },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a patient record (Admin only)
const deletePatientByEmail = async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { email } = req.params;
    const deletedPatient = await Patient.findOneAndDelete({ email });

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPatient,
  getPatientByEmail,
  updatePatientByEmail,
  deletePatientByEmail,
};
