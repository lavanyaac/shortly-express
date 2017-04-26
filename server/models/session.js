const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you session database model methods here

class Sessions extends Model {
  constructor() {
    super('sessions');
  }

  create(client) {
    var salt = Date.now().toString();
    var hashKey = client ? salt + client : salt;
    var uniqueHash;
    utils.generateHash('sha256', hashKey, function(err, data) {
      uniqueHash = data;
    });
    var session = { hash: uniqueHash, salt: salt }

    return super.create.call(this, session);
  }
}

module.exports = new Sessions();