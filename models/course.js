let { Schema, Types, model } = require("mongoose");
let messages = require("../helpers/messages");

let courseSchema = new Schema({
    name: {
        type: String,
        required: [true, messages.genrale.required],
        unique: true
    },
    units: {
        type: [{ type: Types.ObjectId, ref: "Unit" }],
        default: []
    },
    revisions: {
        type: [{ type: Types.ObjectId, ref: "Revision" }],
        default: []
    }
})

let Course = model("Course", courseSchema);

module.exports = Course;