require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
    credentials: {
        accessKeyId: 'AKIAUF5KJOUGMTYJRIAU',
        secretAccessKey: '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',
    },
    region: 'us-east-1',
});

const s3 = new AWS.S3();
const AWS_BUCKET_NAME = 'profileimage1';

const s3PresignedUrlUpload = async (key, contentType) => {
    const params = { Bucket: AWS_BUCKET_NAME, Key: key, ContentType: contentType };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, (err, url) => {
            err ? reject(err) : resolve({ url, key });
        });
    });
};

module.exports = {
    s3PresignedUrlUpload
}