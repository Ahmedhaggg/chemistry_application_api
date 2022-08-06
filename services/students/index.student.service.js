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
        'courseProgress.currentRevision.revisionId': null,
        'courseProgress.currentRevision.arrangement': null
    })

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
    let updateCourseProgress = await Student.updateOne(query, {
        'courseProgress.currentRevision.revisionId': nextRevision.lessonId,
        'courseProgress.currentRevision.arrangement': nextRevision.arrangement,
    });

    return updateCourseProgress.modifiedCount === 1 ? true : handleUpdateErrors(updateCourseProgress);
}

exports.updateCourseRevisionProgress = async (query, courseRevisionProgress) => {
    let updateCourseProgress = await Student.updateOne(query, { courseRevisionProgress });

    return updateCourseProgress.modifiedCount === 1 ? true : handleUpdateErrors(updateCourseProgress);
}

exports.getStudentCourseProgress = async (query) => await Student.findOne(query)
    .select("_id currentCourse courseProgress courseRevisionProgress")