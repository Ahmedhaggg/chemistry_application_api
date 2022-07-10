let { Schema, Types, model } = require("mongoose");

let UnitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    arrangement: {
        type: Number,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    exam: {
        type: {
            degree: String,
            questions: {
                type: [
                    {
                        question: String,
                        answer: String
                    }
                ]
            }
        },
        default: null
    },
    lessons: {
        type: [
            {
                lessonId: { type: Types.ObjectId, ref: "Lesson" },
                name: String
            }
        ],
        default: []
    },
    revisions: {
        type: [
            { type: Types.ObjectId, ref: "Revision" }
        ],
        default: []
    }
});

let Unit = model("Unit", UnitSchema);

module.exports = Unit;


