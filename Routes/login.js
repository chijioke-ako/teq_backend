require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db");

const bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generate");

const valid = require("../middleware/vaildtion");
const loginValidation = require("../Validations/LoginValidation");

router.post("/", valid(loginValidation), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1 ", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("password or Email is incorrect");
    }

    const token = generateToken(user);

    res.json({
      token,
      id: user.rows[0].id,
      isAdmin: user.rows[0].role,
      firstname: user.rows[0].firstname,
      email: user.rows[0].email,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server Error");
  }
});
// router.post(
//   "/",
//   expressAsyncHandler(async (req, res) => {
//     const { email } = req.body;

//     const user = await pool.query("SELECT * FROM users WHERE email = $1 ", [
//       email,
//     ]);

//     if (user.rows) {
//       if (bcrypt.compareSync(req.body.password, user.rows[0].password)) {
//         res.send({
//           id: user.rows[0].id,
//           firstname: user.rows[0].firstname,
//           email: user.rows[0].email,
//           isAdmin: user.rows[0].role,
//           token: generateToken(user),
//         });
//         return;
//       }
//     }

//     res.status(401).send({ message: "wrong email or password please check" });
//   })
// );

module.exports = router;
