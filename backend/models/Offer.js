const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const offerSchema = new Schema(
  {
    helper: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    problem: {
        type: Schema.Types.ObjectId,
        ref: "Problem",
        required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Offer", offerSchema);
