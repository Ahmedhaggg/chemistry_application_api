let { Unit } = require("../../models");
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler")

exports.createUnit = async unitData => {
    try {
        let newUnit = new Unit();
        newUnit.name = unitData.name;
        newUnit.arrangement = unitData.arrangement;
        return await newUnit.save();
    } catch (error) {
        handleInsertErrors(error);
    }
}

exports.updateUnit = async (query, newUnitData) => {
    let updatedUnit = await Unit.updateOne(query, newUnitData);
    return updatedUnit.modifiedCount === 1 ? true : handleUpdateErrors(updatedUnit);
}

exports.getUnit = async query => await Unit.findOne(query)
    .populate({
        path: "lessons",
        options: {
            sort: { 'arrangement': 1 },
        },
        select: "_id name arrangement"
    })
    .populate({
        path: "revisions",
        options: {
            sort: { 'arrangement': 1 }
        },
        select: "_id name arrangement"
    })


exports.getSomeFieldsFromUnit = async (query, fields) => await Unit.findOne(query).select(...fields);

exports.addLessonToUnit = async (query, newLessonId) => {
    let lessonIsAdded = await Unit.updateOne(query, { $push: { lessons: newLessonId } });

    return lessonIsAdded.modifiedCount === 1 ? true : handleUpdateErrors(lessonIsAdded);
}


exports.deleteLessonFromUnit = async (unitId, lessonId) => {
    let lessonIsDeleted = await Unit.updateOne(
        {
            _id: unitId
        },
        {
            $pull: { lessons: lessonId }
        }
    );

    return lessonIsDeleted.modifiedCount === 1 ? true : handleUpdateErrors(lessonIsDeleted);
}

exports.addRevisonToUnit = async (query, newRevisionId) => {
    let revisionIsAdded = await Unit.updateOne(query, { $push: { revisions: newRevisionId } });

    return revisionIsAdded.modifiedCount === 1 ? true : handleUpdateErrors(revisionIsAdded);
}


exports.deleteRevisionFromUnit = async (unitId, revisionId) => {
    let revisionIsDeleted = await Unit.updateOne(
        {
            _id: unitId
        },
        {
            $pull: { revisions: revisionId }
        }
    );

    return revisionIsDeleted.modifiedCount === 1 ? true : handleUpdateErrors(revisionIsDeleted);
}

exports.getLastLessonArragement = async query => {
    let unit = await Unit.findOne(query)
        .select("_id")
        .populate({
            path: "lessons",
            options: {
                sort: { arrangement: -1 },
                limit: 1
            },
            select: "arrangement"
        })

    return !unit ? null : unit.lessons[0]?.arrangement || 0;
}