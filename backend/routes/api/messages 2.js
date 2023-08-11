const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");

router.get("/messages/:userId/:otherUserId", (req, res) => {
  const { userId, otherUserId } = req.params;

  Message.find({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId }
    ]
  })
  .then(messages => res.json(messages))
  .catch(err => res.status(400).json("Error: " + err));
});
router.post("/messages", (req, res) => {
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
  newMessage.save()
    .then(() => res.json("Message sent!"))
    .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;




































// router.get("/messages/:userId/:otherUserId", (req, res) => {
//   const { userId, otherUserId } = req.params;
//   Message.find({
//     $or: [
//       { sender: userId, receiver: otherUserId },
//       { sender: otherUserId, receiver: userId }
//     ]
//   })
//     .sort("timestamp")
//     .then(messages => res.json(messages))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// module.exports = router;
