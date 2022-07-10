let { Schema, Types, model } = require("mongoose");


let gradeSchema = new Schema({
    name: String,
    currentCourse: {
        type: Types.ObjectId,
        ref: "Course",
        required: false
    },
    numberOfStudent: Number
})

let Grade = model("Grade", gradeSchema);

module.exports = Grade;