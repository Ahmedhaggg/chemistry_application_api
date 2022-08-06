let courseService = require("../../services/students/course.student.service")
let revisionService = require("../../services/students/revision.student.service")
let messages = require("../../helpers/messages");
let status = require("../../errors/status");
const APIError = require("../../errors/api.error");


exports.index = async (req, res, next) => {
    let { courseId } = req.params;

    let revisions = await revisionService.getCourseRevisions({ _id: courseId });

    if (revision)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            revisions: null
        });

    res.status(status.OK).json({
        success: true,
        revisions: revisions.revisions
    })
}

exports.show = async (req, res, next) => {
    let { revisionId, courseId } = req.params;

    let revision = await revisionService.getCourseRevision(courseId, revisionId);

    if (revision)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            revision
        });

    res.status(status.OK).json({
        success: true,
        revision
    })
}
