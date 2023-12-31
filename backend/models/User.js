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
    reviewsWritten: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    reviewsReceived: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    profileImageUrl: {
      type: String,
      required: false,
    },
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
userSchema.methods.getProblems = function () {
  return mongoose
    .model("Problem")
    .find({ author: this._id })
    .select("_id")
    .populate();
};

userSchema.methods.getOffers = async function () {
  const offers = await mongoose.model("Offer").find({
    helper: this._id,
  });

  const offersObject = {};
  offers.forEach((offer) => {
    offersObject[offer._id] = offer;
  });

  return offersObject;
};

userSchema.methods.getProblems = function () {
  return mongoose
    .model("Problem")
    .find({ author: this._id })
    .select("_id")
    .lean()
    .then((problems) => problems.map((problem) => problem._id));
};

userSchema.methods.getProblemsObject = async function () {
  const problemsArray = await mongoose
    .model("Problem")
    .find({ author: this._id });

  const problemsObject = problemsArray.reduce((acc, problem) => {
    acc[problem._id] = problem;
    return acc;
  }, {});

  return problemsObject;
};

userSchema.methods.getReviewsWritten = async function () {
  const reviews = await mongoose.model("Review").find({
    reviewer: this._id,
  });

  const reviewsObject = {};
  reviews.forEach((review) => {
    reviewsObject[review._id] = review;
  });

  return reviewsObject;
};

userSchema.methods.getReviewsReceived = async function () {
  const reviews = await mongoose.model("Review").find({
    reviewee: this._id,
  });

  const reviewsObject = {};
  reviews.forEach((review) => {
    reviewsObject[review._id] = review;
  });

  return reviewsObject;
};

// userSchema.virtual('birthdateFormatted').get(function () {
//   return moment(this.birthdate).format('MM-DD-YYYY');
// });

// userSchema.set('toJSON', { virtuals: true });
// userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("User", userSchema);
