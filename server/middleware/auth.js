const models = require('../models');
const Promise = require('bluebird');
const utils = require('../lib/hashUtils.js');


module.exports.createSession = (req, res, next) => {
  if(req.cookies === undefined || Object.keys(req.cookies).length === 0) {
    models.Sessions.create(req.headers['user-agent'])    
      .then(data => {
        models.Sessions.get({ id: data.insertId })
      .then(entry => {
        req.session = { hash: entry.hash };
        res.cookies = { shortlyid: { value: entry.hash }};
        next();
      });
    });
  } else {
    models.Sessions.get({ hash: req.cookies.shortlyid })
      .then(entry => {
        if(entry) {
          var client = req.headers['user-agent'];
          var hashKey = client ? entry.salt + client : entry.salt;
          var uniqueHash;
          utils.generateHash('sha256', hashKey, function(err, data) {
              uniqueHash = data;
          });
          if(uniqueHash !== entry.hash){
            models.Sessions.delete({ hash: entry.hash})
              .then(() => {
                next();
              });
          } else {
            if(entry.user_id) {
              models.Users.get({ id: entry.user_id })
                .then(user => {
                  req.session = { username: user.username, hash: entry.hash, user_id: user.id };
                  res.cookies = { shortlyid: { value: entry.hash} };
                  next();
                });
            } else {
                req.session = { hash: req.cookies.shortlyid };
                res.cookies = { shortlyid: { value: entry.hash} };
                next();
            }
          }
        } else {
          req.session = { hash: req.cookies.shortlyid };
          res.cookies = { shortlyid: {} };
          next();
        }
      });
  }
  //console.log('>>>>>>>>>>>', req);
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

