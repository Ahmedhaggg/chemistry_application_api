let { Schema, Types, model } = require("mongoose");


let revisionSchema = new Schema({
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
            degree: Number,
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

let Revision = model("Revision", revisionSchema);

module.exports = Revision;