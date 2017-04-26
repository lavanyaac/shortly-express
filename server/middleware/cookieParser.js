const querystring = require('querystring');
const _ = require('underscore');

const parseCookies = (req, res, next) => {
  if(req.headers.cookie) {
    var obj = querystring.parse(req.headers.cookie, '; ');
    _.extend(req.cookies, obj);
  }
  next();
};

module.exports = parseCookies;