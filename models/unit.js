let { Schema, Types, model } = require("mongoose");
let messages = require("../helpers/messages");

let UnitSchema = new Schema({
    name: {
        type: String,
        required: [true, messages.genrale.required],
        unique: true
    },
    arrangement: {
        type: Number,
        required: [true, messages.genrale.required]
    },
    exam: {
        _id: false,
        type: {
            _id: false,
            degree: Number,
            questions: [
                {
                    question: String,
                    answers: [
                        String
                    ],
                    correctAnswer: String,
                    _id: false
                }
            ]
        },
        required: false
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


