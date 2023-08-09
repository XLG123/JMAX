const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Problem = mongoose.model("Problem");
const { requireUser } = require("../../config/passport");
// const {
//   multipleFilesUpload,
//   multipleMulterUpload,
// } = require("../../../backend/awsS3");

router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().populate(
      "author",
      "_id username email"
    );

    const modifiedProblems = {};
    problems.forEach((problem) => {
      modifiedProblems[problem._id] = {
        ...problem._doc,
        author: problem.author,
      };
    });

    return res.json(modifiedProblems);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const problems = await Problem.find()
//       .populate({
//         path: "author",
//         select: "_id username email",
//       })
//       .populate({
//         path: "offers",
//         select: "_id price description status helper",
//         populate: {
//           path: "helper",
//           select: "_id username email",
//         },
//       });

//     const modifiedProblems = {};
//     problems.forEach((problem) => {
//       modifiedProblems[problem._id] = {
//         ...problem._doc,
//         author: problem.author,
//         offers: problem.offers,
//       };
//     });

//     return res.json(modifiedProblems);
//   } catch (error) {
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.post(
  "/create",
  // multipleMulterUpload("images"),
  requireUser,
  async (req, res) => {
    // console.log(req.files);
    // const imageUrls = await multipleFilesUpload({
    //   files: req.files,
    //   public: true,
    // });
    const newProblem = new Problem({
      category: req.body.category,
      description: req.body.description,
      address: req.body.address,
      // problemImageUrl: imageUrls,
      status: req.body.status,
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
  }
);



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

router.patch("/:id", requireUser, async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      throw new Error("Problem not found");
    }

    if (!problem.author.equals(req.user._id)) {
      throw new Error("You are not authorized to edit this problem");
    }
    await Problem.updateOne({ _id: req.params.id }, { $set: req.body });

    return res.json({ message: "Problem updated successfully" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const problems = await Problem.find({ author: userId }).populate({
      path: "offers",
      select: "_id price description status helper",
      populate: {
        path: "helper",
        select: "_id username email",
      },
    });

    const problemIdsWithOffers = {};
    problems.forEach((problem) => {
      problemIdsWithOffers[problem._id] = {
        offers: problem.offers,
      };
    });

    res.json(problemIdsWithOffers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/:problemId/offers", async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const offers = await problem.getOffers();

    res.json(offers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.delete("/:id", requireUser, async (req, res) => {
  try {
    // Find the problem by ID
    const problem = await Problem.findById(req.params.id);

    // Check if the problem exists
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Check if the user is the author of the problem
    if (!problem.author.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this problem" });
    }

    // Delete the problem
    await Problem.deleteOne({ _id: problem._id });

    return res.json({ message: "Problem deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting problem" });
  }
});

module.exports = router;
