const { hash } = require('../helpers/hash');
const { Schema, Types, model } = require('mongoose');
let messages = require("../helpers/messages");

let isQuadrantName = (name) => {
    let arrayOfName = this.name.split(" ");
    return arrayOfName.length === 4 ? true : false;
}

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, messages.genrale.required],
        validate: {
            validator: isQuadrantName,
            message: props => messages.register.faild.name
        }
    },
    email: {
        type: String,
        required: [true, messages.genrale.required],
        lowercase: [true, messages.genrale.lowercase],
        unique: [true, messages.genrale.unique]
    },
    password: {
        type: String,
        required: [true, messages.genrale.required]
    },
    phoneNumber: {
        type: String,
        required: [true, messages.genrale.required],
        unique: [true, messages.genrale.unique]
    },
    accepted: {
        type: Boolean,
        default: false
    },
    cureentCourse: { type: Types.ObjectId, ref: "Course" },
    grade: { type: Types.ObjectId, ref: "Grade" },
    courseProgress: {
        type: {
            unitId: { type: Types.ObjectId, ref: "Unit" },
            lessonId: { type: Types.ObjectId, ref: "Lesson" },
            revisionId: { type: Types.ObjectId, ref: "Revision" }
        },
        required: false
    },
    CourseRevisionProgress: { type: Types.ObjectId, ref: "Revison", required: false },
    studentUnitExams: {
        type: [{ type: Types.ObjectId, ref: "StudentUnitExam" }],
        default: []
    },
    courseRevisionExam: {
        type: [
            {
                revisionId: [{ type: Types.ObjectId, ref: "StudentUnitExam" }],
                degree: Number
            }
        ],
        default: []
    },
    lastLogin: {
        type: Date,
        required: false
    }
}, { timestamps: false });

studentSchema.pre("save", async function (next) {
    this.password = await hash(this.password);
    next();
});

const Student = model("Student", studentSchema);

module.exports = Student;

// const mongoose = require('mongoose');

// const categorySchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: [true, "there are category with this name"]
//     },
//     slug: {
//         type: String,
//         required: true
//     },
//     products: {
//         type: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "product"
//             }
//         ],
//         default: []
//     }
// }, { timestamps: true })

// const Category = mongoose.model("categorie", categorySchema);
// module.exports = Category;