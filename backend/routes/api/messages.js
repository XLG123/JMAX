const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");

// router.get("/:userId/:otherUserId", (req, res) => {
//   const { userId, otherUserId } = req.params;

//   Message.find({
//     $or: [
//       { sender: userId, receiver: otherUserId },
//       { sender: otherUserId, receiver: userId },
//     ],
//   })
//     .sort({ createdAt: 1 }) // Sort by createdAt in ascending order
//     .then((messages) => res.json(messages))
//     .catch((err) => res.status(400).json("Error: " + err));
// });


// router.get("/:userId/:otherUserId", (req, res) => {
//   const { userId, otherUserId } = req.params;

//   Message.find({
//     $or: [
//       { sender: userId, receiver: otherUserId },
//       { sender: otherUserId, receiver: userId },
//     ],
//   })
//     .sort({ createdAt: 1 }) // Sort by createdAt in ascending order
//     .then((messages) => {
//       const messagesArray = messages.map((message) => {
//         return { [message._id]: message };
//       });

//       res.json(messagesArray);
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

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
  });

  // Save the new message to the database
  newMessage
    .save()
    .then(() => res.json("Message sent!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
