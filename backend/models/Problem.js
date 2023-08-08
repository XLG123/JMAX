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
  }).select('_id')
  return offers
}

module.exports = mongoose.model("Problem", problemSchema);
