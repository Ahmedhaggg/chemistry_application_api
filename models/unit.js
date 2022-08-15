let { Schema, Types, model } = require("mongoose");
let messages = require("../helpers/messages");

let UnitSchema = new Schema({
    name: {
        type: String
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
        type: [{ type: Types.ObjectId, ref: "Lesson" }],
        default: []
    },
    revisions: {
        type: [{ type: Types.ObjectId, ref: "Revision" }],
        default: []
    }
}, {
    id: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

UnitSchema.virtual('numberOfLessons').get(function () {
    return this.lessons?.length
});

UnitSchema.virtual('numberOfRevisions').get(function () {
    return this.revisions?.length
});

let Unit = model("Unit", UnitSchema);

module.exports = Unit;


