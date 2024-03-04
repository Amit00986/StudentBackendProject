
const AddressService = require('../../services/addressService');

const createAddress = async(req, res) => {
    try {
        const studentId = req.params.studentId;
        const AddressData = req.body;
        const data = await  AddressService.createAddress(studentId, AddressData);
        return res.status(201).json({
            success: true,
            data:data
        })

    } catch (error) {
        
    };
};

module.exports = {
    createAddress
}