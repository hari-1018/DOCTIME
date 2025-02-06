const mongoose = require('mongoose');

const reviewModel = new mongoose.Schema({
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctors' 
    },
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patients' },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comments: {
        type: String,
        required: true,
        trim: true,
    }, 
},{ timestamps: true })

module.exports = mongoose.model('Reviews', reviewModel);

