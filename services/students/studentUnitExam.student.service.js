let { StudentUnitExam } = require("../../models");
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler")

exports.getUnitLessonsDegrees = async query => await (await StudentUnitExam
    .findOne(query)
    .select("lessons")
    .populate({
        path: "lessons.lesson",
        select: "arrangement name"
    })).lessons;

exports.getUnitRevisionsDegrees = async query => await (await StudentUnitExam.findOne(query)
    .select("revisions")
    .populate({
        path: "revisions.revision",
        select: "name arrangement"
    })).revisions;

exports.getLessonDegree = async (query, lessonId) => await (
        await StudentUnitExam.findOne(query, { lessons: { $elemMatch: { lesson: lessonId } } }).select("lessons")
    ).lessons[0];

exports.getRevisionDegree = async (query, revisionId) => await 
    (
        await StudentUnitExam.findOne(query, { revisions: { $elemMatch: { revision: revisionId } } }).select("revisions")
    ).revisions[0];

exports.getUnitDegree = async query => 
    await (
        await StudentUnitExam.findOne({
            unit: query.unitId,
            studentId: query.studentId
        })
        .select("_id degree")
    ).degree;

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

exports.saveUnitDegree = async (query, degree) => {
    let updatedDegree = await StudentUnitExam.updateOne({
        unit: query.unitId,
        studentId: query.studentId
    }, { degree });

    return updatedDegree.modifiedCount === 1 ? true : handleUpdateErrors(updatedDegree);
}

exports.addLessonDegree = async (query, lessonDegree) => {
    let addLessonDegree = await StudentUnitExam.updateOne(query, 
        { 
            $push: { lessons: {
                lesson: lessonDegree.lessonId,
                degree: lessonDegree.degree
            } } 
        }
    );

    return addLessonDegree.modifiedCount === 1 ? true : handleUpdateErrors(addLessonDegree);
}

exports.addRevisionDegree = async (query, revisionDegree) => {
    console.log(revisionDegree.revisionId)
    let addRevisionDegree = await StudentUnitExam.updateOne(query, 
        { 
            $push: { 
                revisions: {
                    revision: revisionDegree.revisionId,
                    degree: revisionDegree.degree
                } 
            } 
        }
    );

    return addRevisionDegree.modifiedCount === 1 ? true : handleUpdateErrors(addRevisionDegree);
}
