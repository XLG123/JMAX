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
    problemImageUrl: {
      type: String,
      required: false,
    },
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

problemSchema.statics.searchByCategory = async function (category) {
  const problems = await this.find({ category: category });
  return problems;
};

module.exports = mongoose.model("Problem", problemSchema);
