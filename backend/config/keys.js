module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  mongoURI: process.env.MONGO_URI,
  isProduction: process.env.NODE_ENV === "production",
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // awsSuppressError: process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE
};
