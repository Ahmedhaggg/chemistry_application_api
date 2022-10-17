require("dotenv").config();

let JWT_SECRET = process.env.JWT_SECRET;
let BCRYPT_SALT = process.env.BCRYPT_SALT;
let DB_URL_CON = process.env.DB_URL_CON
let PORT = process.env.PORT
module.exports = { JWT_SECRET, BCRYPT_SALT, DB_URL_CON, PORT };