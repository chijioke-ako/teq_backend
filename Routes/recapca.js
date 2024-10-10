const router = require('express').Router();
const { request } = require('express');

router.post('/', async (req, res) => {
  if (
    req.body.captcha == undefined ||
    req.body.captcha == '' ||
    req.body.captcha == null
  ) {
    return res.json({ success: false, msg: 'Please select captcha' });
  }

  const VerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secrect=${process.env.RECAPTCHA_SECRETKEY}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  request(VerifyUrl, (err, response, body) => {
    body = JSON.parse(body);

    if (body.success !== undefined && !body.success) {
      return res.json({ success: false, msg: 'failed captcha verification' });
    }
  });
});

module.exports = router;
