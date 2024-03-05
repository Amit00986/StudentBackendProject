const AddressService = require('../../services/addressService');

const createAddress = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const AddressData = req.body;
        const data = await AddressService.createAddressByStudentId(studentId, AddressData);
        if (data) {
            res.status(200).json({
                success: true,
                data: data
            });
        } else {
            res.status(404).json({
                success: false,
                error: "Error while uploading Address"
            });
        };
    } catch (error) {
        console.error('Error uploading Address:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    };
};

const getAddressDetails = async(req, res) => {
    try {
        const studentId = req.params.studentId;
        const data = await AddressService.getAddressDetails(studentId);
        if (data) {
            res.status(200).json({
                success: true,
                data: data
            });
        } else {
            res.status(404).json({
                success: false,
                error: "Error while getting Address"
            });
        };
    } catch (error) {
        
    }
};

module.exports = {
    getAddressDetails,
    createAddress
}