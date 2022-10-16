const { hash } = require('../helpers/hash');
const { Schema, Types, model } = require('mongoose');
let messages = require("../helpers/messages");

let isQuadrantName = (name) => {
    let arrayOfName = name.split(" ");
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
    courseProgress: {
        _id: false,
        type: {
            currentUnit: {
                unitId: { type: Types.ObjectId, ref: "Unit" },
                arrangement: Number
            },
            currentLesson: {
                lessonId: { type: Types.ObjectId, ref: "Lesson" },
                arrangement: Number
            },
            currentUnitRevision: {
                revisionId: { type: Types.ObjectId, ref: "Revision" },
                arrangement: Number
            }
        },
        required: false
    },
    courseRevisionProgress: {
        type: {
            revisionId: Types.ObjectId,
            arrangement: Number
        },
        required: false
    },
    currentCourse: { type: Types.ObjectId, ref: "Course", required: [true, messages.genrale.required] },
    grade: { type: Types.ObjectId, ref: "Grade", required: [true, messages.genrale.required] },
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


/**
 * 
 * courseProgress: {
        type: {
            sectionArrangement: Number,
            courseIsCompleted: {
                type: Boolean,
                default: false
            }
        },
        default: {}
    },

 * courseProgress: {
        _id: false,
        type: {
            currentUnit: {
                unitId: { type: Types.ObjectId, ref: "Unit" },
                arrangement: Number
            },
            currentLesson: {
                lessonId: { type: Types.ObjectId, ref: "Lesson" },
                arrangement: Number
            },
            currentUnitRevision: {
                revisionId: { type: Types.ObjectId, ref: "Revision" },
                arrangemnt: Number
            }
        },
        required: false
    },
    courseRevisionProgress: {
        type: {
            revisionId: Types.ObjectId,
            arrangement: Number
        },
        required: false
    },
 */




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