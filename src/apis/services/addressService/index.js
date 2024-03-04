const AddressModel = require('../../models/Address');

const createAddress = async (studentId, addressData) => {
    try {
        const craetedData = await AddressModel.create({ ...addressData, studentId });
        return craetedData;
    } catch (error) {
        throw new Error('unable to create Address For Student')
    }
};


module.exports = {
    createAddress
}