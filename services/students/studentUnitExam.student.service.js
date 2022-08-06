let { StudentUnitExam } = require("../../models");
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler")

exports.getUnitLessonsDegrees = async query => await StudentUnitExam.findOne(query)
    .select("_id")
    .populate({
        path: "lessons.lessonId",
        select: "name arrangement",
        options: {
            sort: { arrangement: 1 }
        }
    });

exports.getUnitRevisionsDegrees = async query => await StudentUnitExam.findOne(query)
    .select("_id")
    .populate({
        path: "revisions.revisionId",
        select: "name arrangement",
        options: {
            sort: { arrangement: 1 }
        }
    });

exports.getLessonDegree = async (query, lessonId) => await StudentUnitExam.findOne(query, { lessons: { $elemMatch: { lessonId } } })

exports.getRevisionDegree = async (query, lessonId) => await StudentUnitExam.findOne(query, { revisions: { $elemMatch: { revisionId } } })

exports.getUnitDegree = async query => await StudentUnitExam.findOne(query).select("_id degree");

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

exports.saveUnitDegree = async (query, degree) => {
    let updatedDegree = await StudentUnitExam.updateOne(query, { degree });

    return updatedDegree.modifiedCount === 1 ? true : handleUpdateErrors(updatedDegree);
}

exports.addLessonDegree = async (query, lessonDegree) => {
    let addLessonDegree = await StudentUnitExam.updateOne(query, { $push: { lessons: lessonDegree } });

    return addLessonDegree.modifiedCount === 1 ? true : handleUpdateErrors(addLessonDegree);
}

exports.addRevisionDegree = async (query, revisionDegree) => {
    let addRevisionDegree = await StudentUnitExam.updateOne(query, { $push: { revisions: revisionDegree } });

    return addRevisionDegree.modifiedCount === 1 ? true : handleUpdateErrors(addRevisionDegree);
}
