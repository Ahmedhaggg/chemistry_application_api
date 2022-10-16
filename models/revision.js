let { Schema, Types, model } = require("mongoose");
let messages = require("../helpers/messages");

let revisionSchema = new Schema({
    name: {
        type: String,
        required: [true, messages.genrale.required],
    },
    description: {
        type: String,
        required: [true, messages.genrale.required],
    },
    video: {
        type: String,
        required: [true, messages.genrale.required],
    },
    arrangement: {
        type: Number,
        required: [true, messages.genrale.required],
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
        required: [true, messages.genrale.required],
    }
});

let Revision = model("Revision", revisionSchema);


/**
 * 
 *     arrangementInCourse: {
        type: Number,
        required: [true, messages.genrale.required]
    },
 */

module.exports = Revision;