const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemOfferSchema = new Schema(
  {
    offerIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
    problem: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProblemOffer", problemOfferSchema);
