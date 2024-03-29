const express = require('express');

const router = express.Router();

const AddressController = require('../../../controllers/addressController')

router.post('/create/address/:studentId', async (req, res) => {
    try {
        const data = await AddressController.createAddress(req, res);
    } catch (error) {
        throw new Error('error in creating Address Details');
    }
});

router.get('/address/details/:studentId', async (req, res) => {
    try {
        const data = await AddressController.getAddressDetails(req, res)
    } catch (error) {
        throw new Error('error in getting Address Details');
    }
});


module.exports = router;