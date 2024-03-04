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
    };
});


router.put('/upload/profileImage/:studentId', upload.single('image'), async (req, res) => {
    try {
        const data = await ProfileController.uploadProfileImg(req, res);
    } catch (error) {
        throw new Error('error in upload profileImage on AWS');
    };
});


router.put('/update/profile/:studentId', async (req, res) => {
    try {
        const data = await ProfileController.updateProfile(req, res);
    } catch (error) {
        throw new Error('error in upload profile');
    };
});


router.get('/all/student/details', async (req, res) => {
    try {
        const data = await ProfileController.getAllStudent(req, res);
    } catch (error) {
        throw new Error('error in getting profile');
    }
});


router.get('/student/details/:studentId', async (req, res) => {
    try {
        const data = await ProfileController.getStudentDetails(req, res);
    } catch (error) {
        throw new Error('error in getting  studentDetails');
    };
});


module.exports = router;