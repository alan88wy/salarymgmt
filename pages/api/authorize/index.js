import { jwtSecret } from '../../../config/index'
const jwt = require('jsonwebtoken')

export default function handler(req, res) {

  if (req.method === 'GET') {

    if (!('token' in req.cookies)) {
      res.status(401).json({message: 'Unable to authenticate user'});
      return;
    }

    let decoded;

    const token = req.cookies.token;

    if (token) {
      try {
        decoded = jwt.verify(token, jwtSecret);
      } catch (e) {
        console.error(e);
      }
    }

    if (decoded) {
      const data = {token, decoded}

      res.json(data);
      return;
    } else {
      res.status(401).json({message: 'Unable to authenticate user'});
    }
  }
};
