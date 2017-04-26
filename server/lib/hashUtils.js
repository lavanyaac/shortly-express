const crypto = require('crypto');

/************************************************************/
// Add any hashing utility functions below
/************************************************************/

module.exports.hashPassword = function(userPwd){
  let shasum = crypto.createHash('sha1');
  shasum.update(userPwd);
  return shasum.digest('hex');
}

module.exports.generateHash = function(algo, someString, callback) {
  const hash = crypto.createHash(algo);

  hash.on('readable', () => {
    const data = hash.read();
    if (data) {
      callback(null, data.toString('hex')); 
    }
  });

  hash.write(someString);
  hash.end();
}