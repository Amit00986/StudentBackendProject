const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    studentId: {
        type: String,
        unique: true
    },

    studentProfile: {
        type: String
    },

    FirstName: {
        type: String
    },

    LastName: {
        type: String
    },

    phoneNumber: {
        type: Number
    },

    Standard: {
        type: String
    },

    FaviourateSubject: [{
        type: String
    }],

    address: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
    },


}, { timestamps: { createdAt: true, updatedAt: true }, versionKey: false },);

const student = new mongoose.model('student', studentSchema);

module.exports = student