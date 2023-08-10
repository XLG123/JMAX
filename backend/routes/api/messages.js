const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");

router.get("/messages/:roomId/:userId?/:otherUserId?", (req, res) => {
  const { roomId, userId, otherUserId } = req.params;

  if (roomId) {

    Message.find({ roomId })
      .sort("timestamp")
      .then(messages => res.json(messages))
      .catch(err => res.status(400).json("Error: " + err));
  } else if (userId && otherUserId) {
    Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    })
    .sort("timestamp")
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json("Error: " + err));
  } else {
    res.status(400).json("Invalid request parameters");
  }
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
