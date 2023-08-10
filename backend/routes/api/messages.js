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
    .sort("timestamp")
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
