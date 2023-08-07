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
    savedProblem = await savedProblem.populate("author", "_id username email");

    return res.json(savedProblem);
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

router.get("/:id", requireUser, async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id).populate(
      "author",
      "_id username email"
    );
    return res.json(problem);
  } catch (err) {
    const error = new Error("Problem not found");
    error.statusCode = 404;
    error.errors = { message: "No problem found with that id" };
    return next(error);
  }
});

// router.delete("/:id", requireUser, async (req, res, next) => {
//   try {
//     const problem = await Problem.findById(req.params.id)
//       .populate("author", "_id username email")
//       .then((problem) => problem.remove());
//   } catch (err) {
//     const error = new Error("Error deleting problem");
//     error.statusCode = 404;
//     error.errors = { message: "Error deleting problem" };
//     return next(error);
//   }
// });

router.delete("/:id", requireUser, async (req, res) => {
  try {
    // Find the problem by ID
    const problem = await Problem.findById(req.params.id);
    console.log(problem);
    console.log(problem.author_id);

    // Check if the problem exists
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Check if the user is the author of the problem
    if (problem.author_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this problem" });
    }

    // Delete the problem
    await Problem.deleteOne({ _id: problem._id });

    return res.json({ message: "Problem deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error deleting problem" });
  }
});

module.exports = router;
