let { Grade } = require("../../models");
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler")

exports.createGrade = async gradeData => {
    try {
        let newGrade = new Grade();
        newGrade.name = gradeData.name;
        newGrade.currentCourse = gradeData.currentCourse;
        return await newGrade.save();
    } catch (error) {
        handleInsertErrors(error);
    }
}

exports.updateGrade = async (query, newGredeData) => {
    let updatedGrede = await Grade.updateOne(query, newGredeData);

    return updatedGrede.modifiedCount === 1 ? true : handleUpdateErrors(newGredeData);
}

exports.getGrade = async query => await Grade.findOne(query).populate("currentCourse");

exports.getAllGrades = async () => await Grade.find();


