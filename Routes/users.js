const router = require('express').Router();
const pool = require('../db');
require('dotenv').config();

const valid = require("../middleware/vaildtion");
const userValidation = require("../Validations/usersValidation");

router.get('/', async (req, res) => {
  try {
    const allUsers = await pool.query('SELECT * FROM users');
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const users = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(users.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//put Publications

router.put("/:id", valid(userValidation), async (req, res) => {
  try {
    const results = await pool.query(
      "UPDATE users SET firstname = $1, lastname = $2, email = $3, role = $4 where id = $5 returning *",
      [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.role,
        req.params.id,
      ]
    );

    res.status(200).json({
      status: "Users was updated Successfully !",
      data: {
        user: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteusers = await pool.query('DELETE FROM users WHERE id= $1', [
      id,
    ]);
    res.json('Users was deleted Successfully !');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
