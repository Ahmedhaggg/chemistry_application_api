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

    return updatedCourse.modifiedCount === 1 ? true : handleUpdateErrors(updatedCourse);
}

exports.getCourse = async query => await Course.findOne(query);
// .populate("Unit Revison");

exports.getAllCourses = async () => await Course.find().select("_id name");

exports.addUnitToCourse = async (query, newUnitData) => {
    let unitIsAdded = await Course.updateOne(query, { $push: { units: newUnitData } });
    return unitIsAdded.modifiedCount === 1 ? true : handleUpdateErrors(unitIsAdded);
}

exports.getCourseUnits = async query => await Course.findOne(query).select("units");

exports.updateUnitNameInCourse = async (courseId, unitId, newName) => {
    let unitIsUpdated = await Course.updateOne(
        {
            _id: courseId,
            "units.unitId": unitId
        },
        {
            $set: { 'units.$.name': newName }
        }
    );
    console.log(unitIsUpdated)
    return unitIsUpdated.modifiedCount === 1 ? true : handleUpdateErrors(unitIsUpdated);
}