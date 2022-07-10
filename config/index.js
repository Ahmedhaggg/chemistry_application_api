require("dotenv").config();

let JWT_SECRET = process.env.JWT_SECRET;
let BCRYPT_SALT = process.env.BCRYPT_SALT;

module.exports = { JWT_SECRET, BCRYPT_SALT };