let { Unit } = require("../../models");

exports.getUnit = async query => await Unit.findOne(query)
    .select("_id name numberOfLessons numberOfRevisions arrangement")
    .populate({
        path: "revisions",
        select: "name arrangement",
        options: {
            sort: { arrangement: 1 }
        }
    })
    .populate({
        path: "lessons",
        select: "name arrangement",
        options: {
            sort: { arrangement: 1 }
        }
    });

exports.getExam = async query => await Unit.findOne(query).select("exam");

exports.getUnitAndLesson = async (unitId, lessonId) => await Unit.findOne({ _id: unitId }, { lessons: lessonId })
    .populate("lessons")