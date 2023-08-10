const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");

// router.get("/messages/:roomId", (req, res) => {
//     const { roomId } = req.params;
//     Message.find({ roomId })
//       .sort("timestamp")
//       .then(messages => res.json(messages))
//       .catch(err => res.status(400).json("Error: " + err));
//   });

//   module.exports = router;


// module.exports = router;
router.get("/messages/:roomId", (req, res) => {
    const { roomId } = req.params;
    Message.find({ roomId })
      .sort("timestamp")
      .then(messages => res.json(messages))
      .catch(err => res.status(400).json("Error: " + err));
  });

  module.exports = router;
