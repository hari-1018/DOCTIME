const mongoose = require('mongoose');

const appointmentModel = new mongoose.Schema({
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctors' 
    },
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patients' },
    slotDate: { 
        type: String,
        required: true, 
    },
    slotTime: { 
        type: String,
        required: true,
     },
     fees:{
        type: Number,
        required: true,
     },
     cancelled:{
        type: Boolean,
        default: false,
     },
     payment:{
        type: Boolean,
        default: false,
     },
     isCompleted:{
        type: Boolean,
        default: false,
     },
     isDelete:{
       type: Boolean,
       default: false,
     }

},{ timestamps: true })

module.exports = mongoose.model('Appointments', appointmentModel);

