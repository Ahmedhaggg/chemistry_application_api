let { Revision, Unit } = require("../../models");
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler");

exports.getUnitRevisons = async query => await Unit.findOne(query).select("revisions");

exports.createUnitRevision = async newData => {
    try {
        let newRevision = new Revision();
        newRevision.name = newData.name;
        newRevision.arrangement = newData.arrangement;
        newRevision.video = newData.video;
        newRevision.description = newData.description;

        return await newRevision.save();
    } catch (error) {
        handleInsertErrors(error)
    }
}

exports.updateUnitRevision = async (query, newData) => {
    let updatedRevision = await Revision.updateOne(query, newData);

    return updatedRevision.modifiedCount === 1 ? true : handleUpdateErrors(updatedRevision);
}

exports.getUnitRevision = async query => await Revision.findOne(query);

exports.deleteUnitRevision = async query => {
    let deletedRevision = await Revision.deleteOne(query);

    return deletedRevision.deletedCount === 1 ? true : false;
}