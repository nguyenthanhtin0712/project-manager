const express = require('express');
const router = express.Router();

// Dummy route để test
router.get('/', (req, res) => {
  res.json({ message: 'Project API is working!' });
});

module.exports = router;