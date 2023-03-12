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
        newStudentUnitExam.unit = newData.unitId;
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

exports.getStudentDegrees = async (studentId) => await StudentCourseExam
    .findOne({ studentId })
    .select("_id revisions")
    .populate({
        path: "unitsExams",
        select: "degree",
        populate: {
            path: "unit",
            select: "name arrangement exam.degree"
        }
    })
    .populate({
        path: "revisionsExams.revision",
        select: "name arrangement"
    });

    
exports.getStudentUnitExamsDegrees = async (studentId, unitId) => await StudentUnitExam
    .findOne({
        studentId,
        unit: unitId
    })
    .select("degree lessons revisions")
    .populate({
        path: "lessons.lesson",
        select: "name arrangement exam.degree"
    })
    .populate({
        path: "revisions.revision",
        select: "name arrangement exam.degree"
    })