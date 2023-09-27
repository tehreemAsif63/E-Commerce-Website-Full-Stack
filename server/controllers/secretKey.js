const crypto = require('crypto');
const secretJWTKey = crypto.randomBytes(32).toString('hex');

module.exports = secretJWTKey;
