const mongoose = require("mongoose");
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
    age: {
      type: Number,
      required: true,
    },
    // reviewsWritten: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    // reviewsReceived: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toSafeObject = function () {
  let user = this.toObject();
  delete user.hashedPassword;
  return user;
};
// userSchema.methods.getProblems = function() {
//   return mongoose.model('Problem').find({ author: this._id }).select('_id').populate();
// };
userSchema.methods.getProblems = async function () {
  const problems = await mongoose
    .model("Problem")
    .find({ author: this._id })
    .select("_id");
  return problems.map((problem) => problem._id);
};



// userSchema.virtual('birthdateFormatted').get(function () {
//   return moment(this.birthdate).format('MM-DD-YYYY');
// });

// userSchema.set('toJSON', { virtuals: true });
// userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("User", userSchema);
