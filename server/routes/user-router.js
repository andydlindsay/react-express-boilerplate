const express = require('express');
const router = express.Router();

const pool = require('../database/connection');

// GET /api/users
router.get('/', (req, res) => {
  pool.query('SELECT * FROM users;')
    .then((response) => {
      res.json(response.rows);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
