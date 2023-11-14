const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const UnautorizedError = require('../errors/UnautorizedError');

const handleError = (req, res, next) => {
  next(new UnautorizedError('С токеном проблема'));
}


module.exports = function auth(req, res, next) {
  const { authorization } = req.headers;
  // console.log(authorization)
  let payload;
  if (!authorization || !authorization.startsWith('Bearer ')) return handleError(res, req, next);

  try {
    const jwtToken = authorization.replace('Bearer ', '');    
    console.log(jwtToken);
    if(!jwtToken) return handleError(res, req, next);
    payload = jwt.verify(jwtToken, SECRET);
  } catch (error) {
    return handleError(res, req, next);
  }
  req.user = payload;
  next();
};