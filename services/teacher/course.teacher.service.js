let { Course } = require("../../models");
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler")

exports.createCourse = async courseData => {
    try {
        let newCourse = new Course();
        newCourse.name = courseData.name;
        return await newCourse.save();
    } catch (error) {
        handleInsertErrors(error);
    }
}

exports.updateCourse = async (query, newCourseData) => {
    let updatedCourse = await Course.updateOne(query, newCourseData);
    console.log(updatedCourse)
    return updatedCourse.modifiedCount === 1 ? true : handleUpdateErrors(updatedCourse);
}

exports.getCourse = async query => await Course.findOne(query);
// .populate("Unit Revison");

exports.getAllCourses = async () => await Course.find().select("_id name");

