let { Course } = require("../../models");
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler")

exports.getAllCourses = async () => await Course.find().select("_id name");

exports.createCourse = async courseData => {
    try {
        let newCourse = new Course();
        newCourse.name = courseData.name;
        newCourse.numberOfUnits = courseData.numberOfUnits
        newCourse.numberOfRevisions = courseData.numberOfRevisions
        return await newCourse.save();
    } catch (error) {
        handleInsertErrors(error);
    }
}

exports.updateCourse = async (query, newCourseData) => {
    let updatedCourse = await Course.updateOne(query, newCourseData);

    return updatedCourse.modifiedCount === 1 ? true : handleUpdateErrors(updatedCourse);
}

exports.getCourse = async query => await Course.findOne(query)
    .populate({
        path: "units",
        options: {
            sort: { 'arrangement': 1 }
        },
        select: "_id name arrangement"
    })
    .populate({
        path: "revisions",
        options: {
            sort: { 'arrangement': 1 }
        },
        select: "_id name arrangement"
    });

exports.addUnitToCourse = async (query, newUnitId) => {
    let unitIsAdded = await Course.updateOne(query, { $push: { units: newUnitId } });
    return unitIsAdded.modifiedCount === 1 ? true : handleUpdateErrors(unitIsAdded);
}

exports.getCourseUnits = async query => await Course.findOne(query)
    .select("_id")
    .populate({
        path: "units",
        options: {
            sort: { 'arrangement': 1 }
        },
        select: "_id name arrangement"
    });

exports.getCourseRevisions = async query => await Course.findOne(query)
    .select("_id")
    .populate({
        path: "revisions",
        options: {
            sort: { 'arrangement': 1 }
        },
        select: "_id name arrangement"
    })


exports.addRevisionToCourse = async (query, newRevisionId) => {
    let revisionIsAdded = await Course.updateOne(query, { $push: { revisions: newRevisionId } });

    return revisionIsAdded.modifiedCount === 1 ? true : handleUpdateErrors(revisionIsAdded);
}


exports.deleteRevisionFromCourse = async (courseId, revisionId) => {
    let revisionIsDeleted = await Course.updateOne(
        {
            _id: courseId
        },
        {
            $pull: { revisions: { revisionId } }
        }
    );

    return revisionIsDeleted.modifiedCount === 1 ? true : handleUpdateErrors(revisionIsDeleted);
}