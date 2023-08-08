const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemOfferSchema = new Schema(
  {
    offer: {
      type: Schema.Types.ObjectId,
      ref: "Offer",
    },
    problem: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProblemOffer", problemOfferSchema);
