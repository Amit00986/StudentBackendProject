require('dotenv').config();
const profileServcie = require('../../services/profileService');
const AWS_BUCKET_NAME = 'profileimage1';
const { s3PresignedUrlUpload } = require('../../../common/helper/Aws/index')
const uuid = require('uuid').v4;


const createProfile = async (req, res) => {
    try {
        const data = req.body;
        const createdProfile = await profileServcie.createProfile(data);

        if (createdProfile) {
            res.status(201).json({
                success: true,
                data: createdProfile
            });
        } else {
            res.status(409).json({
                success: false,
                error: "Error while creating profile"
            });
        }
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    };
};

const uploadProfileImg = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        const processFile = async (file) => {
            const key = `${uuid()}-${file.originalname.replace(/\s/g, '_')}`;

            const { url } = await s3PresignedUrlUpload(key, file.mimetype);

            const response = await fetch(url, {
                method: 'PUT',
                body: file.buffer,
                headers: { 'Content-Type': file.mimetype },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to upload resource to S3. Status: ${response.status}, Error: ${errorText}`);
                throw new Error(`Failed to upload resource to S3. Status: ${response.status}`);
            }
            return `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
        };

        let studentProfile = {};

        if (req.files && req.files.length > 0) {
            const Urls = await Promise.all(req.files.map(processFile));
            studentProfile.Url = Urls;
        } else if (req.file) {
            studentProfile.Url = await processFile(req.file);
        }
        const data = await profileServcie.saveImageUrltoDb(studentId, studentProfile.Url);

        if (data) {
            res.status(200).json({
                success: true,
                data: data
            });
        } else {
            res.status(403).json({
                success: false,
                error: "Error while uploading profile"
            });
        }

    } catch (error) {
        console.error('Error uploading profile to AWS:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getStudentDetails = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        const data = await profileServcie.getStudentDetails(studentId);
        
        if (data) {
            res.status(200).json({
                success: true,
                data: data
            });
        } else {
            res.status(403).json({
                success: false,
                error: "Error while Getting profile"
            });
        }
    } catch (error) {
        console.error('Error uploading profile to AWS:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const updateData = req.body;
        const data = await profileServcie.updateProfile(studentId, updateData);
        if (data) {
            res.status(200).json({
                success: true,
                data: data
            });
        } else {
            res.status(404).json({
                success: false,
                error: "Error while Getting profile"
            });
        };
    } catch (error) {
        console.error('Error uploading profile update Profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getAllStudent = async (req, res) => {
    try {
        const data = await profileServcie.getAllStudent();
        if (data) {
            res.status(200).json({
                success: true,
                data: data
            });
        } else {
            res.status(404).json({
                success: false,
                error: "Error while Getting profile"
            });
        };
    } catch (error) {
        console.error('Error uploading profile to AWS:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    createProfile,
    getStudentDetails,
    updateProfile,
    getAllStudent,
    uploadProfileImg,
}