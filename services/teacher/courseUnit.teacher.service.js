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



