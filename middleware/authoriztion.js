const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
  if (!req.headers['authorization']) return res.send('Unauthorized');
  const authHeader = req.headers['authorization'];

  const bearerToken = authHeader.split(' ');

  const token = bearerToken[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET || 'somethingsecret',
    (err, decode) => {
      if (err) {
        return res.status(401).send('Unauthorized');
      }
      req.user = decode;

      console.log(req.user);
      next();
    }
  );
};
