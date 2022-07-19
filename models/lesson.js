let { Schema, model } = require("mongoose");

let lessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    arrangement: {
        type: Number,
        required: true
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
                    correctAnswer: String
                }
            ]
        },
        required: true
    }
});

let Lesson = model("Lesson", lessonSchema);

module.exports = Lesson;