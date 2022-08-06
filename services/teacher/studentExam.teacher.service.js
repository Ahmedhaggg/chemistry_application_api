let { StudentCourseExam, StudentUnitExam } = require("../../models")
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler")

exports.createStudentCourseExam = async newData => {
    try {
        let newStudentCourseExam = new StudentCourseExam();
        newStudentCourseExam.courseId = newData.courseId;
        newStudentCourseExam.studentId = newData.studentId;
        newStudentCourseExam.unitsExams = newData.unitsExams;

        return await newStudentCourseExam.save();
    } catch (error) {
        handleInsertErrors(error)
    }
}

exports.createStudentUnitExam = async newData => {
    try {
        let newStudentUnitExam = new StudentUnitExam();
        newStudentUnitExam.unitId = newData.unitId;
        newStudentUnitExam.studentId = newData.studentId;
        return await newStudentUnitExam.save();
    } catch (error) {
        handleInsertErrors(error)
    }
}

exports.addUnitExamToCourseExam = async (query, unitExamId) => {
    let addUnitExam = await StudentCourseExam.updateOne(query, { $push: { unitsExams: unitExamId } });

    return addUnitExam.modifiedCount === 1 ? true : handleUpdateErrors(addUnitExam);
}