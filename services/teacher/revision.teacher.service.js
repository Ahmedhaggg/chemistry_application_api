let { Revision, Unit, Course } = require("../../models");
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler");

exports.getUnitRevisons = async query => await Unit.findOne(query).select("_id").populate("revisions", "name arrangement");

exports.getCourseRevisons = async query => await Course.findOne(query).select("revisions");

exports.createRevision = async newData => {
    try {
        let newRevision = new Revision();
        newRevision.name = newData.name;
        newRevision.arrangement = newData.arrangement;
        newRevision.video = newData.video;
        newRevision.description = newData.description;
        newRevision.exam = newData.exam;
        return await newRevision.save();
    } catch (error) {
        handleInsertErrors(error)
    }
}

exports.updateRevision = async (query, newData) => {
    let updatedRevision = await Revision.updateOne(query, newData);

    return updatedRevision.modifiedCount === 1 ? true : handleUpdateErrors(updatedRevision);
}

exports.getRevision = async query => await Revision.findOne(query);

exports.deleteRevision = async query => {
    let deletedRevision = await Revision.deleteOne(query);

    return deletedRevision.deletedCount === 1 ? true : false;
}