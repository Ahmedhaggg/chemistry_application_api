let { Revision, Unit, Course } = require("../../models");

exports.getUnitRevisons = async query => await Unit.findOne(query)
    .select("_id")
    .populate({
        path: "revisions",
        select: "name arrangement"
    });

exports.getCourseRevisions = async courseId => await Course.findOne({ _id: courseId })
    .select("_id")
    .populate({
        path: "revisions",
        options: {
            sort: { arrangement: 1 }
        },
        select: "_id name arrangement"
    })

exports.getCourseRevision = async (courseId, revisionId) => {
    let course = await Course.findOne({ _id: courseId }, { revisions: revisionId }).populate("revisions");
    return course.revisions[0];
}


exports.getUnitRevision = async (unitId, revisionId) => await Course.findOne({ _id: unitId }, { revisions: { $elemMatch: revisionId } }).populate("revisions");
