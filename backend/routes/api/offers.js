const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Offer = mongoose.model("Offer");
const Problem = mongoose.model("Problem");
const { requireUser } = require("../../config/passport");

router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find().populate("helper", "_id username email");

    const modifiedOffers = {};
    offers.forEach((offer) => {
      modifiedOffers[offer._id] = {
        ...offer._doc,
        helper: offer.helper,
      };
    });

    return res.json(modifiedOffers);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create", requireUser, async (req, res) => {
  const newOffer = new Offer({
    price: req.body.price,
    description: req.body.description,
    status: req.body.status,
    helper: req.user._id,
    problem: req.body.problem,
  });

  try {
    let savedOffer = await newOffer.save();
    savedOffer = await savedOffer.populate("problem", "_id");
    savedOffer = await savedOffer.populate("helper", "_id username email");

    return res.json(savedOffer);
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

router.get("/:id", requireUser, async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id).populate(
      "helper",
      "_id username email"
    );
    return res.json(offer);
  } catch (err) {
    const error = new Error("Offer not found");
    error.statusCode = 404;
    error.errors = { message: "No offer found with that id" };
    return next(error);
  }
});

router.patch("/:id", requireUser, async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      throw new Error("Offer not found");
    }

    // if (!offer.helper.equals(req.user._id)) {
    //   throw new Error("You are not authorized to edit this offer");
    // }
    await Offer.updateOne({ _id: req.params.id }, { $set: req.body });

    return res.json({ message: "Offer updated successfully" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/:id", requireUser, async (req, res) => {
  try {
    // Find the problem by ID
    const offer = await Offer.findById(req.params.id);

    // Check if the problem exists
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Check if the user is the author of the problem
    // if (!offer.helper.equals(req.user._id)) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to delete this offer" });
    // }

    // Delete the problem
    await Offer.deleteOne({ _id: offer._id });

    return res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting offer" });
  }
});

module.exports = router;
