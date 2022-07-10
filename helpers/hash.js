let bcrypt = require("bcrypt");
let { BCRYPT_SALT } = require("../config");
exports.hash = async data => {
    console.log("dtatat", data);
    console.log("ddd", BCRYPT_SALT)
    const salt = await bcrypt.genSalt(JSON.parse(BCRYPT_SALT));

    let hash = await bcrypt.hash(data, salt);

    return hash;
}
exports.compare = async (data, hashedData) => {
    let isHashed = await bcrypt.compare(data, hashedData);

    return isHashed;
} 