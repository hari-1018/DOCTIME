const mongoose = require('mongoose');

const doctorModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fees: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    qualifications: {
        type: [String],
        required: true,
        default: [],
    },
    specialization: {
        type: String,
        required: true,
    },
    experience:{
        type: Number,
    },
    availability: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });


module.exports = mongoose.model('Doctors', doctorModel);
