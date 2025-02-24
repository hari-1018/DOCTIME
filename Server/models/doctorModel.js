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
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    about:{
        type: String,
        required: false,
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
    fees: {
        type: Number,
    },
    averageRating:{
        type: Number,
        default: 0
    },
    slotsBooked: {
        type: Object,
        default: {}
    },      
    resetTokenPassword: {
        type: String
    },
    resetTokenExpiration: {
        type:Date
    },
},{ timestamps: true });


module.exports = mongoose.model('Doctors', doctorModel);
