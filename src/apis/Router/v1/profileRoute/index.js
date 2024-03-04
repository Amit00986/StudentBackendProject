const express = require('express');

const router = express.Router();

const ProfileController = require('../../../controllers/profileController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create/student', async (req, res) => {
    try {
        const data = await ProfileController.createProfile(req, res);

    } catch (error) {
        throw new Error('error in route');
    }
});


router.put('/upload/profileImage/:studentId', upload.single('image'), async (req, res) => {
    try {
        const data = await ProfileController.uploadProfileImg(req, res);

    } catch (error) {
        throw new Error('error in upload profileImage on AWS');
    }
});


module.exports = router;