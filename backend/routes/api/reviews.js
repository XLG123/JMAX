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
router.get("/:reviewId", async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId)
      .populate("reviewer", "_id username")
      .populate("reviewee", "_id username");
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    return res.json(review);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
});
router.patch("/:reviewId", requireUser, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      throw new Error("Review not found");
    }
    if (req.user._id.toString() !== review.reviewer.toString()) {
      throw new Error("You are not authorized to edit this review");
    }

    await Review.updateOne({ _id: req.params.reviewId }, { $set: req.body });

    const updatedReview = await Review.findById(req.params.reviewId)
      .populate("reviewer", "_id username")
      .populate("reviewee", "_id username");
    return res.json(updatedReview);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});
router.delete("/:reviewId", requireUser, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    if (req.user._id.toString() !== review.reviewer.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this review" });
    }

    await Review.deleteOne({ _id: req.params.reviewId });

    return res.json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting problem" });
  }
});

module.exports = router;
