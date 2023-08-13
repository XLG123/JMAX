const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Problem = require("../../models/Problem");
const Offer = require("../../models/Offer");
const User = mongoose.model("User");
const passport = require("passport");
const { loginUser, restoreUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const Message = require("../../models/Message");

// router.get("/", async (req, res)=>{
//   const users = await User.find().populate("_id", "username email address");
//   return res.json(users);
// });
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "username email address age");
    const userMap = {};
    users?.forEach((user) => {
      userMap[user._id] = {
        username: user.username,
        email: user.email,
        address: user.address,
        age: user.age,
      };
    });
    return res.json(userMap);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An error occurred" });
  }
});

// router.get("/:userId", async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.userId)
//     return res.json(user);
//   } catch (err) {
//     const error = new Error("User not found");
//     error.statusCode = 404;
//     error.errors = { message: "No user found with that id" };
//     return next(error);
//   }
// });

//All the user's problems
router.get("/:userId/problems", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const problems = await user.getProblems();
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

//All the user's open problems
router.get("/:userId/problems/open", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const problems = await user.getProblemsObject();
    const openProblems = Object.values(problems).reduce((result, problem) => {
      if (problem.status === "open") {
        result[problem._id] = problem;
      }
      return result;
    }, {});

    res.json(openProblems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

//All the user's closed problems
router.get("/:userId/problems/closed", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const problems = await user.getProblemsObject();
    const closedProblems = Object.values(problems).filter(
      (problem) => problem.status === "closed"
    );

    res.json(closedProblems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/:userId/problems/offers", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const problems = await user.getProblems();
    const result = {};
    for (const problem of problems) {
      const offers = await Offer.find({ problem: problem._id });
      if (offers.length !== 0) result[problem._id] = offers;
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/register", validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  if (user) {
    // Throw a 400 error if the email address and/or username already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    age: req.body.age,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      } catch (err) {
        next(err);
      }
    });
  });
});

router.post("/login", validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get("/current", restoreUser, async (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    address: req.user.address,
    age: req.user.age,
  });
});

router.get("/:userId/offers/accepted", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const offers = await user.getOffers();
  const acceptedOffers = Object.values(offers).filter(
    (offer) => offer.status === "accepted"
  );
  res.json(acceptedOffers);}
)

router.get("/:userId/offers/pending", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const offers = await user.getOffers();
  const pendingOffers = Object.values(offers).filter(
    (offer) => offer.status === "pending"
  );
  res.json(pendingOffers);}
)
module.exports = router;
