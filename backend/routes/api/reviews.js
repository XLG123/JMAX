const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = mongoose.model("Review");
const { requireUser } = require("../../config/passport");

router.post("/create", requireUser, async (req, res) => {
  const newReview = new Review({
    rating: req.body.rating,
    description: req.body.description,
    reviewer: req.user._id,
    reviewee: req.body.reviewee,
  });

  try {
    let savedReview = await newReview.save();
    savedReview = await Review.findById(savedReview._id)
      .populate("reviewer", "_id username")
      .populate("reviewee", "_id username");

    return res.json(savedReview);
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});
module.exports = router;
