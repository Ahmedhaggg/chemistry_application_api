let { Schema, model, Types } = require("mongoose");

let adminSchema = new Schema({
    email: String,
    password: String
}, { timestamps: false })

let Admin = model("Admin", adminSchema);

module.exports = Admin;


