let { Lesson } = require("../../models");
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler")

exports.createLesson = async newData => {
    try {
        let newLesson = new Lesson();
        newLesson.name = newData.name;
        newLesson.arrangement = newData.arrangement;
        newLesson.video = newData.video;
        newLesson.description = newData.description;
        newLesson.exam = newData.exam;

        return await newLesson.save();
    } catch (error) {
        handleInsertErrors(error)
    }
}

exports.updateLesson = async (query, newData) => {
    let updatedLesson = await Lesson.updateOne(query, newData);

    return updatedLesson.modifiedCount === 1 ? true : handleUpdateErrors(updatedLesson);
}

exports.getLesson = async query => await Lesson.findOne(query);

exports.deleteLesson = async query => {
    let deletedLesson = await Lesson.deleteOne(query);

    return deletedLesson.deletedCount === 1 ? true : false;
}