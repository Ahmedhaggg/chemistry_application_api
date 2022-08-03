let { Schema, model } = require("mongoose");
let messages = require("../helpers/messages");

let lessonSchema = new Schema({
    name: {
        type: String,
        required: [true, messages.genrale.required]
    },
    description: {
        type: String,
        required: [true, messages.genrale.required]
    },
    video: {
        type: String,
        required: [true, messages.genrale.required]
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
        required: [true, messages.genrale.required]
    }
});

let Lesson = model("Lesson", lessonSchema);

module.exports = Lesson;