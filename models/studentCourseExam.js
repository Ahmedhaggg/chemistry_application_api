let { Schema, model, Types } = require("mongoose");
let messages = require("../helpers/messages");

let StudentCourseExamSchema = new Schema({
    studentId: {
        type: Types.ObjectId,
        ref: "Student",
        required: [true, messages.genrale.required]
    },
    courseId: {
        type: Types.ObjectId,
        ref: "Course",
        required: [true, messages.genrale.required]
    },
    unitsExams: {
        type: [{ type: Types.ObjectId, ref: "StudentUnitExam" }],
        default: []
    },
    revisionsExams: {
        type: [
            {
                revision: { type: Types.ObjectId, ref: "Revision" },
                degree: Number,
                _id: false
            }
        ],
        default: []
    },
});

let StudentCourseExam = model("StudentCourseExam", StudentCourseExamSchema);

module.exports = StudentCourseExam;

