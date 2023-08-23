const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Problem = mongoose.model("Problem");
const { requireUser } = require("../../config/passport");
// const { DEFAULT_PROBLEM_IMAGE_URL } = require("../../seeders/images");
const DEFAULT_PROBLEM_IMAGE_URL =
  "https://my-jmax.s3.us-east-2.amazonaws.com/public/tools.svg";
const {
  multipleFilesUpload,
  multipleMulterUpload,
  singleFileUpload,
  singleMulterUpload,
} = require("../../../backend/awsS3");

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

router.get("/open", async (req, res) => {
  try {
    const problems = await Problem.find().populate(
      "author",
      "_id username email"
    );

    const modifiedProblems = {};
    problems.forEach((problem) => {
      if (problem.status === "open") {
        modifiedProblems[problem._id] = {
          ...problem._doc,
          author: problem.author,
        };
      }
    });

    return res.json(modifiedProblems);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/closed", async (req, res) => {
  try {
    const problems = await Problem.find().populate(
      "author",
      "_id username email"
    );

    const modifiedProblems = {};
    problems.forEach((problem) => {
      if (problem.status === "closed") {
        modifiedProblems[problem._id] = {
          ...problem._doc,
          author: problem.author,
        };
      }
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
  singleMulterUpload("image"),
  requireUser,
  async (req, res) => {
    let imageUrls;

    const problemImageUrl = req.file
      ? await singleFileUpload({ file: req.file, public: true })
      : null;
    const newProblem = new Problem({
      category: req.body.category,
      description: req.body.description,
      address: req.body.address,
      problemImageUrl,
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

// router.patch("/:id", requireUser, async (req, res) => {
//   try {
//     const problem = await Problem.findById(req.params.id);
//     if (!problem) {
//       throw new Error("Problem not found");
//     }

//     if (!problem.author.equals(req.user._id)) {
//       throw new Error("You are not authorized to edit this problem");
//     }
//     await Problem.updateOne({ _id: req.params.id }, { $set: req.body });

//     return res.json({ message: "Problem updated successfully" });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// });

router.patch(
  "/:id",
  singleMulterUpload("image"), // If you want to update the image as well
  requireUser,
  async (req, res) => {
    const { id } = req.params;

    try {
      // Find the problem by ID
      let problemToUpdate = await Problem.findById(id);

      if (!problemToUpdate) {
        return res.status(404).json({ error: "Problem not found" });
      }

      // Check if the user is the author of the problem
      if (problemToUpdate.author.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ error: "You don't have permission to update this problem" });
      }

      // Update the problem fields
      if (req.body.category) problemToUpdate.category = req.body.category;
      if (req.body.description)
        problemToUpdate.description = req.body.description;
      if (req.body.address) problemToUpdate.address = req.body.address;
      if (req.body.status) problemToUpdate.status = req.body.status;

      // Handle image update
      if (req.file) {
        const problemImageUrl = await singleFileUpload({
          file: req.file,
          public: true,
        });
        problemToUpdate.problemImageUrl = problemImageUrl;
      }

      // Save the updated problem
      const updatedProblem = await problemToUpdate.save();

      return res.json(updatedProblem);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
);

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

//Search by category
router.get("/search/category/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const problems = await Problem.find({ category: category }).populate(
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

//Search by address
router.get("/search/address/:address", async (req, res) => {
  try {
    const address = req.params.address;

    const problems = await Problem.find({ address: address }).populate(
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

module.exports = router;
