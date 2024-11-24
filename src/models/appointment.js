const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Patient relationship
  email: { type: String, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Doctor relationship
  date: { type: Date, required: true },
  notes: { type: String },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
