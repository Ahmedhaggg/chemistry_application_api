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
    let addUnitExam = await StudentCourseExam.updateOne(query, { $push: { units: studentUnitExamId } });

    return addUnitExam.modifiedCount === 1 ? true : handleUpdateErrors(addUnitExam);
}

exports.addStudentRevisionExamToCourseStudentExam = async (query, revisionDegree) => {
    let addRevisionDegree = await StudentCourseExam.updateOne(query, { $push: { revisions: {
        revision: revisionDegree.revisionId,
        degree: revisionDegree.degree
    } } });

    return addRevisionDegree.modifiedCount === 1 ? true : handleUpdateErrors(addRevisionDegree);
}

exports.getAllUnitsExamsDegrees = async query => await StudentCourseExam.findOne(query)
    .select("_id units")
    .populate({
        path: "units",
        select: "degree",
        populate: {
            path: "unit",
            select: "_id name arrangement"
        }
    })

exports.getAllRevisionsExamsDegrees = async query => await ( await StudentCourseExam.findOne(query)
    .select("_id revisions")
    .populate({
        path: "revisions.revision",
        select: "_id arrangement name"
    })).revisions;

exports.getCourseRevisionExamDegree = async (query, revisionId) => await (await StudentCourseExam
    .findOne(query, { revisions: { $elemMatch: { revision: revisionId } } }).select("revisions")).revisions[0]?.degree || null;
