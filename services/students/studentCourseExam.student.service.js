let { StudentCourseExam } = require("../../models");
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler")

exports.getCourseDegrees = async query => await StudentCourseExam.findOne(query)
    .select("_id")
    .populate({
        path: "units",
        select: "name arrangement"
    })
    .populate({
        path: "revisions",
        select: "name arrangement"
    });


exports.createStudentCourseExam = async newData => {
    try {
        let newStudentCourseExam = new StudentCourseExam();
        newStudentCourseExam.courseId = newData.courseId;
        newStudentCourseExam.studentId = newData.studentId;
        return await newStudentCourseExam.save();
    } catch (error) {
        handleInsertErrors(error)
    }
}


exports.addStudentUnitExamToCourseStudentExam = async (query, studentUnitExamId) => {
    let addUnitExam = await StudentCourseExam.updateOne(query, { $push: { unitsExams: studentUnitExamId } });

    return addUnitExam.modifiedCount === 1 ? true : handleUpdateErrors(addUnitExam);
}

exports.addStudentRevisionExamToCourseStudentExam = async (query, revisionDegree) => {
    let addRevisionDegree = await StudentCourseExam.updateOne(query, { $push: { revisions: revisionDegree } });

    return addRevisionDegree.modifiedCount === 1 ? true : handleUpdateErrors(addRevisionDegree);
}

exports.getAllUnitsExamsDegrees = async query => await StudentCourseExam.findOne(query)
    .select("_id")
    .populate({
        path: "unitsExams",
        select: "degree",
        populate: {
            path: "unitId",
            select: "_id name arrangement"
        }
    })

exports.getAllRevisionsExamsDegrees = async query => await StudentCourseExam.findOne(query)
    .select("_id revisions")
    .populate({
        path: "revisions.revisionId",
        select: "_id arrangement name"
    });

exports.getCourseRevisionExamDegree = async (query, revisionId) => await StudentCourseExam
    .findOne(query, { revisions: { $elemMatch: { revisionId } } });
