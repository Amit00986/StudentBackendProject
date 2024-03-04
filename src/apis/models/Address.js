const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({

    studentId: {
        type: String
    },

    streetAddress: {
        type: String,
    },

    city: {
        type: String,
    },

    state: {
        type: String,
    },

    postalCode: {
        type: Number,
    },

    country: {
        type: String,
    },

}, { timestamps: { createdAt: true, updatedAt: true }, versionKey: false },
);

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;

