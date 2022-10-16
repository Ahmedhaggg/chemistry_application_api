let { Student } = require("../../models");
const { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler");

exports.createStudent = async studentData => {
    try {
        let newStudent = new Student();
        newStudent.name = studentData.name;
        newStudent.email = studentData.email;
        newStudent.password = studentData.password;
        newStudent.phoneNumber = studentData.phoneNumber;
        newStudent.grade = studentData.grade;
        newStudent.currentCourse = studentData.currentCourse;
        return await (await newStudent.save())._id;
    } catch (error) {
        handleInsertErrors(error);
    }
}

exports.getStudentLoginData = async query => await Student
    .findOne(query)
    .select("email accepted password currentCourse");


exports.getStudentProfileData = async query => await Student.findOne(query);

exports.updateCourseUnitProgress = async (query, newData) => {
    let updateCourseProgress = await Student.updateOne(query, {
        'courseProgress.currentUnit.unitId': newData.nextUnit.unitId,
        'courseProgress.currentUnit.arrangement': newData.nextUnit.arrangement,
        'courseProgress.currentLesson.lessonId': newData.nextLesson.lessonId,
        'courseProgress.currentLesson.arrangement': newData.nextLesson.arrangement,
        'courseProgress.currentUnitRevision': null    
    })
    console.log(updateCourseProgress)
    return updateCourseProgress.modifiedCount === 1 ? true : handleUpdateErrors(updateCourseProgress);
}

exports.updateUnitLessonProgress = async (query, nextLesson) => {
    let updateCourseProgress = await Student.updateOne(query, {
        'courseProgress.currentLesson.lessonId': nextLesson.lessonId,
        'courseProgress.currentLesson.arrangement': nextLesson.arrangement,
    });

    return updateCourseProgress.modifiedCount === 1 ? true : handleUpdateErrors(updateCourseProgress);
}


exports.updateUnitRevisionProgress = async (query, nextRevision) => {
    console.log(nextRevision)
    let updateCourseProgress = await Student.updateOne(query, {
        'courseProgress.currentUnitRevision': nextRevision,
    });
    return updateCourseProgress.modifiedCount === 1 ? true : handleUpdateErrors(updateCourseProgress);
}

exports.updateCourseRevisionProgress = async (query, courseRevisionProgress) => {
    let updateCourseProgress = await Student.updateOne(query, { courseRevisionProgress });

    return updateCourseProgress.modifiedCount === 1 ? true : handleUpdateErrors(updateCourseProgress);
}


exports.completeStudentCourse = async (studentId) => {
    let updateCourseProgress = await Student.updateOne({ _id: studentId }, { 
        'courseProgress.courseIsCompleted': true
    });

    return updateCourseProgress.modifiedCount === 1 ? true : handleUpdateErrors(updateCourseProgress);
}

exports.updateProgressArrangement = async (studentId, progressArrangement) => {
    let updateCourseProgress = await Student.updateOne({ _id: studentId }, { 
        'courseProgress.sectionArrangement': progressArrangement
    });

    return updateCourseProgress.modifiedCount === 1 ? true : handleUpdateErrors(updateCourseProgress);
}
// exports.getStudentCourseProgress = async (query) => await Student.findOne(query)
    // .select("_id currentCourse courseProgress courseRevisionProgress")



// {
//     "nextUnit": {
//         "unitId": "62f912687bc8fa64f4c99dcc",
//         "arrangement": 4
//     },
//     "nextLesson": {
//         "lessonId": "62f913037bc8fa64f4c99dd3",
//         "arrangement": 1
//     }
// }

// {
    // "nextUnit": {
    //     "unitId": "{{unitId}}",
    //     "arrangement": 1
    // },
    // "nextLesson": {
    //     "lessonId": "{{lessonId}}",
    //     "arrangement": 1
    // }
// }