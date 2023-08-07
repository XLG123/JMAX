const AWS = require("aws-sdk");
const multer = require("multer");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = "my-jmax"; // <-- Use your bucket name here

module.exports = {
  s3
};
