const express = require('express');
const router = express.Router();

/* GET tweets listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/problems"
  });
});

module.exports = router;
