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
        type: {
            degree: String,
            questions: [
                {
                    question: String,
                    answer: String
                }
            ]
        },
        required: true
    }
});

let Lesson = model("Lesson", lessonSchema);

module.exports = Lesson;