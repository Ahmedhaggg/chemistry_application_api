let { Schema, Types, model } = require("mongoose");
let messages = require("../helpers/messages")

let gradeSchema = new Schema({
    name: {
        type: String,
        required: [true, messages.genrale.required],
        unique: true
    },
    currentCourse: {
        type: Types.ObjectId,
        ref: "Course",
        required: false
    },
    numberOfStudent: {
        type: Number,
        required: false
    }
})

let Grade = model("Grade", gradeSchema);

module.exports = Grade;