let { Schema, Types, model } = require("mongoose")

let studentExamSchema = new Schema({
    unitId: {
        type: Types.ObjectId,
        ref: "Unit",
        required: true
    },
    unitName: {
        type: String,
        required: true
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
                degree: Number
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
                degree: Number
            }
        ],
        default: []
    },
    arrangement: {
        type: Number,
        required: true
    }
})

let StudentUnitExam = model("StudentUnitExam", studentExamSchema);

module.exports = StudentUnitExam;
