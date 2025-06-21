const express = require('express');
const router = express.Router();
const db = require('../models/db');

// 
router.get('/:ownerId', async (req, res) => {
  const { ownerId } = req.params;

  try {
    const [results] = await db.query(
      'SELECT dog_id, name, size FROM Dogs WHERE owner_id = ?',
      [ownerId]
    );

    res.json(results);
  } catch (error) {
    console.error('Error fetching dogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
