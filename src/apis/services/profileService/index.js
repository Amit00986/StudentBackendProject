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

module.exports = {
    createProfile,
    saveImageUrltoDb
};