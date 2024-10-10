const router = require('express').Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const allPublications = await pool.query(
      'SELECT * FROM publications ORDER BY date_created DESC LIMIT 6'
    );
    res.json(allPublications.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
