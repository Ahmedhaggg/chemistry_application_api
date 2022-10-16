let { Schema, Types, model } = require("mongoose")
let messages = require("../helpers/messages");

let studentExamSchema = new Schema({
    unit: {
        type: Types.ObjectId,
        ref: "Unit",
        required: [true, messages.genrale.required]
    },
    studentId: {
        type: Types.ObjectId,
        ref: "Student",
        required: [true, messages.genrale.required]
    },
    degree: {
        type: Number,
        default: null
    },
    lessons: {
        type: [
            {
                lesson: {
                    type: Types.ObjectId,
                    ref: "Lesson"
                },
                degree: Number,
                _id: false
            }
        ],
        default: []
    },
    revisions: {
        type: [
            {
                revision: {
                    type: Types.ObjectId,
                    ref: "Revision"
                },
                degree: Number,
                _id: false
            }
        ],
        default: []
    }
})



let StudentUnitExam = model("StudentUnitExam", studentExamSchema);


module.exports = StudentUnitExam;
