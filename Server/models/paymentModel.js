// models/Payment.js
const mongoose = require('mongoose');

const paymentModel = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointments',
    required: true
  },

  razorpayOrderId: {
    type: String,
  },
  
  razorpayPaymentId: {
    type: String,
  },
  razorpaySignature: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'INR',
  },

  status: {
    type: String,
    enum: ['pending', 'successfull', 'failed'],
    default: 'pending'
  },
  
  paymentDate:{
    type: Date,
    default: Date.now()
  }
}, { timestamps: true });

module.exports = mongoose.model('Payments', paymentModel);
