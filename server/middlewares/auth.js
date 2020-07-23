const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET || 'secret', (err, auth) => {
      if (err) {
        res.send({
          statusCode: 401,
          message: 'Unauthorized'
        })
      } else {
        next();
      }
    })
  } else {
    res.send({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
}

function getUser(req) {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearerToken = bearerHeader.split(' ')[1];
    var user = null;
    try {
      user = jwt.verify(bearerToken, process.env.JWT_SECRET || 'secret').user;
    } catch (e) {
      user = null;
    }
    return user;
  } else {
    return null;
  }
}

module.exports = {verifyToken, getUser};
