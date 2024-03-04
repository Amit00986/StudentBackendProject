const mongoose = require('mongoose');
const AddressModel = require('../../models/Address');
const studentModel = require('../../models/profile');

const createAddressByStudentId = async (studentId, addressData) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
        const data = await AddressModel.create([{ ...addressData, studentId }]);
        const addressObjectId = data[0]._id;

        const updatedProfile = await studentModel.findOneAndUpdate(
            { studentId: studentId },
            { $set: { address: addressObjectId } },
            { new: true }
        );
        // if ((updatedProfile != null || updatedProfile != undefined) && (data != null || data != undefined)) {
        //     await session.commitTransaction();
        //     session.endSession();
        // } else {
        //     session.endSession();
        // }
        return data;
    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        throw new Error('Failed to create Address');
    };
};

module.exports = {
    createAddressByStudentId
}