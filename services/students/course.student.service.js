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