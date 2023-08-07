const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Problem = mongoose.model("Problem");
const { requireUser } = require("../../config/passport");

router.get("/", function (req, res, next) {
  res.json({
    message: "GET /api/problems",
  });
});

router.post("/create", requireUser, async (req, res, next) => {
  const newProblem = new Problem({
    category: req.body.category,
    description: req.body.description,
    address: req.body.address,
    author: req.user._id,
  });
  try {
    let savedProblem = await newProblem.save();
    savedProblem = await savedProblem.populate(
      "author",
      "_id username email"
    );

    return res.json(savedProblem);
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
