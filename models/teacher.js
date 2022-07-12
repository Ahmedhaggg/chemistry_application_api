let { Schema, model, Types } = require("mongoose");
let { hash } = require("../helpers/hash");

let teacherSchema = new Schema({
    email: String,
    password: String
}, { timestamps: false });

teacherSchema.pre("save", async function (next) {
    this.password = await hash(this.password);
    next();
});

let Teacher = model("Teacher", teacherSchema);

module.exports = Teacher;


