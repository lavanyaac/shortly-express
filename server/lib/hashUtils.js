const crypto = require('crypto');

/************************************************************/
// Add any hashing utility functions below
/************************************************************/

module.exports = function(userPwd){
    let shasum = crypto.createHash('sha1');
    shasum.update(userPwd);
    return shasum.digest('hex');
}