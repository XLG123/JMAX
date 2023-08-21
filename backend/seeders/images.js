require('dotenv').config();
const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const Problem = require('../models/Problem.js');

const DEFAULT_PROBLEM_IMAGE_URL = 'https://my-jmax.s3.us-east-2.amazonaws.com/public/tools.svg'; // <- Insert the S3 URL that you copied above here

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    initializeImages();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });


  // Initialize image fields in db
  const initializeImages = async () => {
    console.log("Initializing problem avatars...");
    await Problem.updateMany({}, { problemImageUrl: DEFAULT_PROBLEM_IMAGE_URL });

    console.log("Done!");
    mongoose.disconnect();
  }

  module.exports = {
    DEFAULT_PROBLEM_IMAGE_URL,
  };
