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

exports.getUnit = async query => await Unit.findOne(query);
// .populate("Unit Revison");


exports.getSomeFieldsFromUnit = async (query, fields) => await Unit.findOne(query).select(...fields);

exports.addLessonToUnit = async (query, newLessonData) => {
    let lessonIsAdded = await Unit.updateOne(query, { $push: { lessons: newLessonData } });

    return lessonIsAdded.modifiedCount === 1 ? true : handleUpdateErrors(lessonIsAdded);
}


exports.updateLessonInUnit = async (unitId, lessonId, newLessonName) => {
    let unitIsUpdated = await Unit.updateOne(
        {
            _id: unitId,
            "lessons.lessonId": lessonId
        },
        {
            $set: { 'lessons.$.name': newLessonName }
        }
    );

    return unitIsUpdated.modifiedCount === 1 ? true : handleUpdateErrors(unitIsUpdated);
}

exports.deleteLessonFromUnit = async (unitId, lessonId) => {
    let lessonIsDeleted = await Unit.updateOne(
        {
            _id: unitId
        },
        {
            $pull: { lessons: { lessonId } }
        }
    );

    return lessonIsDeleted.modifiedCount === 1 ? true : handleUpdateErrors(lessonIsDeleted);
}