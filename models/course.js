let { Schema, Types, model } = require("mongoose");

let courseSchema = new Schema({
    name: {
        type: String,
        required: true
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