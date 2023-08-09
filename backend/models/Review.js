const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    // rating: {
    //   type: Number,
    //   min: 1,
    //   max: 5,
    // },
    offerId: {
      type: Schema.Types.ObjectId,
      ref: "Offer",
    },
    description: {
      type: String,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Good",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
