const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Problem = mongoose.model("Problem");

router.get("/", function (req, res, next) {
  res.json({
    message: "GET /api/problems",
  });
});

router.post("/create", async (req, res, next) => {
  const newProblem = new Problem({
    category: req.body.category,
    description: req.body.description,
    address: req.body.address,
  });
  try {
    const savedProblem = await newProblem.save();
    return res.json(savedProblem);
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
