const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: Number,
        
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    age: {
        type: Number,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Patients', userModel);
