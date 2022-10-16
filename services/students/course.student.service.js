const { handleUpdateErrors } = require("../../errors/databaseErrorHandler");
let { Course } = require("../../models");

exports.getCourse = async query => await Course.findOne(query)
    .populate({
        path: "revisions",
        select: "name arrangement",
        options: {
            sort: { arrangement: 1 }
        }
    })
    .populate({
        path: "units",
        select: "name arrangement",
        options: {
            sort: { arrangement: 1 }
        }
    });

exports.getcourseRevision = async query => await Course.findOne(query).select("revisions");

exports.getLastSectionArrangement = async query => 
    await (await Course.findOne(query).select("lastSectionArrangement"))
        .lastSectionArrangement;

exports.updateLastSectionArrangement = async query => {
    let updateCourse = await Course.updateOne(query, { $inc: { lastSectionArrangement: 1 }});

    return updateCourse.modifiedCount === 1 ? true : handleUpdateErrors(updateCourse);
}