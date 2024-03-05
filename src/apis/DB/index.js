require('dotenv').config();
const mongoose = require('mongoose');

const DbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
        });
        console.log('Mongodb SuccessFully Connected ')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    };
};

module.exports = DbConnect;