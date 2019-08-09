const jwt = require('jsonwebtoken');

export default function jwtverify(req, res, next) {
    jwt.verify(req.headers.token, 'secretkey', (err) => {
        if (err) {
          res.json({
            code: 404,
            message: 'Token is not valid.'
          });
        } else {
          next();
        }
    });
}