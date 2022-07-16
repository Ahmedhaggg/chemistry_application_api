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


