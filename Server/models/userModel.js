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
        type: [
            {
                profileImageUrl: { type: String },
                profileThumbnailUrl: { type: String },
            },
        ],
        default: [],
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
}, { timestamps: true });

module.exports = mongoose.model('patients', userModel);
