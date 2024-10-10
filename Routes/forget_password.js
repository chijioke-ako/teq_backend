const router = require('express').Router();
const Jwt = require('jsonwebtoken');
const pool = require('../db');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const nodemailer = require('nodemailer');

const saltRounds = 10;

// //reset password post
router.post('/', async (req, res) => {
  const { email } = req.body;

  pool.query(
    'SELECT * FROM users WHERE email = $1 ',
    [email],

    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.rows.length > 0) {
        res.send('Password reset link has been sent to email...');

        const secret = process.env.JWTSECRET + result.password;
        const payload = {
          email: result.rows[0].email,
          id: result.rows[0].id,
        };

        const token = Jwt.sign(payload, secret, { expiresIn: '15m' });

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: ' iken6970@gmail.com',
            pass: 'cisoiclhegsygqnz',
          },
        });

        var mailOptions = {
          from: 'iken6970@gmail.com',
          to: 'kingchiji89@gmail.com',
          subject: 'Password Reset',

          html: `<p>We heard that you just lost your password</p> <p> Don't worry, use the link below to reset it</p>
            <a>This link valid for 15 minutes</a> http://localhost:3000/forget_password/${result.rows[0].id}/${token}
          `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('email send ' + info.response);
          }
        });
      } else {
        res.status(400).send({ data: "Email doesn't exist!! " });
      }
    }
  );
});

// //verify user for forgot password time
router.get('/rest-password/:id/:token', (req, res) => {
  const { id, token } = req.params;

  pool.query('SELECT * FROM users WHERE id= $1 ', [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      const secret = process.env.JWTSECRET + result.password;
      const payload = Jwt.verify(token, secret, (err, done) => {
        if (err) {
          res.status(400).send({ data: 'Token has been expired...!' });
        } else {
          res.status(201).send({ data: 'You can now enter a new Password...' });
        }
      });
    }
  });
});

// /* update password to database */
router.post('/rest-password/:id/:token', (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  pool.query(
    'SELECT * FROM users email WHERE id= $1',
    [id],
    (error, result) => {
      const secret = process.env.JWTSECRET + result.password;
      const payload = Jwt.verify(token, secret, (err, done) => {
        if (err) {
          res.status(400).send({ data: 'Token has been expired...!' });
        } else {
          if (done) {
            bcrypt.hash(password, saltRounds, (err, hash) => {
              if (err) {
                res.status(400).send('Token has been expired...!');
                return;
              } else if (hash) {
                pool.query(
                  'UPDATE users SET password=$1 WHERE id=$2',
                  [hash, id],
                  (err, resp) => {
                    if (err) {
                      res.status(400).send({ data: 'not ok...!' });
                    } else {
                      res
                        .status(201)
                        .json(
                          'Your password  have been reset successfully...!'
                        );
                    }
                  }
                );
              }
            });
          }
        }
      });
    }
  );
});

module.exports = router;
