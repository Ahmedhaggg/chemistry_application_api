let { Schema, Types, model } = require("mongoose")
let messages = require("../helpers/messages");

let studentExamSchema = new Schema({
    unitId: {
        type: Types.ObjectId,
        ref: "Unit",
        required: [true, messages.genrale.required]
    },
    studentId: {
        type: Types.ObjectId,
        ref: "Student",
        required: [true, messages.genrale.required]
    },
    unitName: {
        type: String,
        required: [true, messages.genrale.required]
    },
    degree: {
        type: Number,
        required: false
    },
    lessons: {
        type: [
            {
                lessonId: Types.ObjectId,
                lessonName: String,
                degree: Number,
                _id: false
            }
        ],
        default: []
    },
    revisions: {
        type: [
            {
                revisionId: {
                    type: Types.ObjectId,
                    ref: "Revision"
                },
                degree: Number,
                _id: false
            }
        ],
        default: []
    },
    arrangement: {
        type: Number,
        required: [true, messages.genrale.required],
    }
})

let StudentUnitExam = model("StudentUnitExam", studentExamSchema);

module.exports = StudentUnitExam;
