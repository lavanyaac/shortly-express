const crypto = require('crypto');
const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you user database model methods here

class Users extends Model {
  constructor() {
    super('users');
  }

  create(user) {
    let shasum = crypto.createHash('sha1');
    shasum.update(user.password);
    user.password = shasum.digest('hex');

    return super.create.call(this, user);
  }
}

module.exports = new Users();