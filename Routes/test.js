const express = require('express');
const db = require('../db');
const testRouter = express.Router();

testRouter.get('/', async (req, res) => {
  try {
    const test = await db.query('SELECT * FROM  pcms ORDER BY id DESC LIMIT 3');
    res.json(test.rows);
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.message)
    
  }
});
module.exports = testRouter;
