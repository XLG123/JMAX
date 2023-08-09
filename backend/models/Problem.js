const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "open",
    },
     reviewsWritten: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    reviewsReceived: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    // problemImageUrl: {
    //   type: [String],
    //   required: false,
    // },
  },

  {
    timestamps: true,
  }
);

problemSchema.methods.getOffers = async function () {
  const offers = await mongoose.model("Offer").find({
    problem: this._id,
  });

  const offersObject = {};
  offers.forEach((offer) => {
    offersObject[offer._id] = offer;
  });

  return offersObject;
};
problemSchema.methods.getReviewsWritten = async function () {
  const reviews = await mongoose.model("Review").find({
    reviewer: this._id,
  });

  const reviewsObject = {};
  reviews.forEach((review) => {
    reviewsObject[review._id] = review;
  });

  return reviewsObject;
};

problemSchema.methods.getReviewsReceived = async function () {
  const reviews = await mongoose.model("Review").find({
    reviewee: this._id,
  });

  const reviewsObject = {};
  reviews.forEach((review) => {
    reviewsObject[review._id] = review;
  });

  return reviewsObject;
};

module.exports = mongoose.model("Problem", problemSchema);
