const express = require('express');

const router = express.Router();

const AddressController = require('../../../controllers/addressController')

router.post('/create/address/:studentId', async(req, res) => {
    try {
        const data = await AddressController.createAddress(req, res);
    } catch (error) {
        
    }

});


module.exports = router;