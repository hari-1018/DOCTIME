// models/Payment.js
const mongoose = require('mongoose');

const paymentModel = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointments',
    required: true
  },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patients',
    required: true
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctors',
    required: true
  },

  razorpayOrderId: {
    type: String,
    required: true,
    unique: true
  },
  
  razorpayPaymentId: {
    type: String,
    unique: true,
    sparse: true  // Allows null values
  },

//   razorpaySignature: {
//     type: String,
//     sparse: true
//   },
  amount: {
    type: Number,
    required: true
  },

//   currency: {
//     type: String,
//     default: 'INR'
//   },

  status: {
    type: String,
    enum: ['pending', 'successful', 'failed'],
    default: 'pending'
  },

  paymentMethod: {
    type: String,
    enum: ['card', 'netbanking', 'upi', 'wallet'],
    required: true
  },
  
  paymentDate:{
    type: Date,
    default: Date.now()
  }
}, { timestamps: true });

module.exports = mongoose.model('Payments', paymentModel);
