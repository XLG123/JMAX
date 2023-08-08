const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemOfferSchema = new Schema(
  {
    helper: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
