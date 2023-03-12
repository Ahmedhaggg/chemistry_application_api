let { Course } = require("../../models");
let { handleInsertErrors, handleUpdateErrors } = require("../../errors/databaseErrorHandler");
const { query } = require("express");

exports.getAllCourses = async () => await Course.find().select("_id name");

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
    let unitIsAdded = await Course.updateOne(query, { $push: { units: newUnitId }, $inc: { numberOfUnits: 1 } });
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
    let revisionIsAdded = await Course.updateOne(query, { $push: { revisions: newRevisionId }, $inc: { numberOfRevisions: 1 } });

    return revisionIsAdded.modifiedCount === 1 ? true : handleUpdateErrors(revisionIsAdded);
}


exports.deleteRevisionFromCourse = async (courseId, revisionId) => {
    let revisionIsDeleted = await Course.updateOne(
        {
            _id: courseId
        },
        {
            $pull: { revisions: { revisionId } },
            $inc: { numberOfRevisions: -1 }
        }
    );

    return revisionIsDeleted.modifiedCount === 1 ? true : handleUpdateErrors(revisionIsDeleted);
}

exports.countCourseUnits = async (id) => {
    let course = await Course.findOne({ _id: id})
        .select("_id units")
    return course.units.length;
}
exports.countCourseRevisions = async (id) => {
    let course = await Course.findOne({ _id: id})
        .select("_id revisions")
    return course.revisions.length;
}
exports.getLastUnitArragement = async query => {
    let course = await Course.findOne(query)
        .select("_id")
        .populate({
            path: "units",
            options: {
                sort: { arrangement: -1 },
                limit: 1
            },
            select: "arrangement"
        })

    return !course ? null : course.units[0]?.arrangement || 0;
}

exports.getLastRevisionArragement = async query => {
    let course = await Course.findOne(query)
        .select("_id")
        .populate({
            path: "revisions",
            options: {
                sort: { arrangement: -1 },
                limit: 1
            },
            select: "arrangement"
        })

    return !course ? null : course.revisions[0]?.arrangement || 0;
}

exports.getFirstUnitInCourse = async (courseId) => 
    await (
        await Course.findOne({ _id: courseId })
            .select("_id")
            .populate({
                path: "units",
                options: {
                    sort: { arrangement: 1},
                    limit: 1
                },
                select: "_id arrangement lessons",
                populate: {
                    path: "lessons",
                    options: {
                        sort: { arrangement: 1},
                        limit: 1
                    },
                    select: "_id arrangement"
                }
            })
    ).units[0];

// getLastUnit("636e9694a45f66a546a1259d").then((r) => console.log(r))