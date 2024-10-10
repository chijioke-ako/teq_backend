require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db");
// const authenticate = require("../middleware/authoriztion");
const generateToken = require("../middleware/generate");
const bcrypt = require("bcryptjs");

const valid = require("../middleware/vaildtion");
const userValidation = require("../Validations/usersValidation");

router.post("/", valid(userValidation), async (req, res) => {
  try {
    //1. Destructure the req.body (name, email, password)

    const { firstname, lastname, email, password, role } = req.body;

    //2. check if user exist (if user the throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json({ message: "User already exist" });
    }

    //3. Bcrypt the user password

    const saltRound = 10;

    const salt = await bcrypt.genSaltSync(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);
    //4. enter the new user inside our database

    const newUser = await pool.query(
      "INSERT INTO users (firstname, lastname, email, password , role ) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstname, lastname, email, bcryptPassword, role]
    );

    //5. generating our jwt token
    const token = generateToken(newUser);
    res.json({ token, data: "user has been registered" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server Error");
  }
});

module.exports = router;
