const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Message = require("../../models/Message");
const User = require("../../models/User");

router.get("/:userId/:otherUserId", (req, res) => {
  const { userId, otherUserId } = req.params;

  Message.find({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId },
    ],
  })
    .sort({ createdAt: 1 }) // Sort by createdAt in ascending order
    .then((messages) => {
      res.json(messages);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/", (req, res) => {
  const { sender, receiver, content } = req.body;

  // Validate the required fields
  if (!sender || !receiver || !content) {
    return res.status(400).json("Missing required fields");
  }

  // Create a new message instance
  const newMessage = new Message({
    sender,
    receiver,
    content,
    timestamps,
  });

  // Save the new message to the database
  newMessage
    .save()
    .then(() => res.json("Message sent!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.get("/:userId", async (req, res) => {

//   try {
//     const userId = req.params.userId;

//     const senderIds = await Message.distinct("sender", {
//       receiver: userId,
//     });

//     const receiverIds = await Message.distinct("receiver", {
//       $or: [{ sender: userId }, { receiver: userId }],
//     });

//     const allAssociatedIds = [...senderIds, ...receiverIds];

//     // Remove duplicates by converting the array to a Set and back to an array
//     const uniqueAssociatedIds = [...new Set(allAssociatedIds)];

//     res.json(uniqueAssociatedIds);
//   } catch (error) {
//     console.error("Error fetching associated IDs:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const senderIds = await Message.distinct("sender", {
      receiver: userId,
    });

    const receiverIds = await Message.distinct("receiver", {
      $or: [{ sender: userId }, { receiver: userId }],
    });

    const allAssociatedIds = [...senderIds, ...receiverIds];

    // Remove duplicates by converting the array to a Set and back to an array
    const uniqueAssociatedIds = [...new Set(allAssociatedIds)];

    const users = await User.find({
      _id: { $in: uniqueAssociatedIds },
    });

    // Create a user object with user IDs as keys
    const usersById = users.reduce((acc, user) => {
      acc[user._id.toString()] = user.toObject();
      return acc;
    }, {});

    res.json(usersById);
  } catch (error) {
    console.error("Error fetching associated users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
