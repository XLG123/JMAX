const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('birthdateFormatted').get(function () {
  return moment(this.birthdate).format('YYYY-MM-DD');  // returns "YYYY-MM-DD"
});

// To include virtuals in toJSON() and toObject() output
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("User", userSchema);
