const studentModel = require('../../models/profile');
const { createUUID } = require('../../../common/libs/UUID/UUIDV4');

const createProfile = async (data) => {
    try {
        const studentId = `SID_${createUUID()}`;
        const datas = await studentModel.create({ ...data, studentId });
        return datas;
    } catch (error) {
        console.error('Error in service create profile function');
    };
};

const saveImageUrltoDb = async (studentId, uploadImg) => {
    try {
        const data = await studentModel.findOneAndUpdate(
            { studentId: studentId },
            { studentProfile: uploadImg },
            { new: true }
        );
        return data;
    } catch (error) {
        console.error('Error in service save profile In Db:', error);
        throw error;
    };
};

const getStudentDetails = async (studentId) => {
    try {
        const data = await studentModel.find({ studentId: studentId }).populate('address');
        return data;
    } catch (error) {
        console.error('Error in service save profile In Db:', error);
        throw error;
    };
};

const updateProfile = async (studentId, updateData) => {
    try {
        const data = await studentModel.findOneAndUpdate({ studentId: studentId }, updateData, { new: true });
        return data;
    } catch (error) {
        console.error('Error in service update student profile In Db:', error);
        throw error;
    }
};

const getAllStudent = async () => {
    try {
        const data = await studentModel.find();
        return data;
    } catch (error) {
        console.error('Error in service update student profile In Db:', error);
        throw error;
    }
};


module.exports = {
    createProfile,
    getAllStudent,
    updateProfile,
    getStudentDetails,
    saveImageUrltoDb
};