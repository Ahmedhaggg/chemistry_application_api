const APIError = require("../../errors/api.error");
let status = require("../../errors/status");
let messages = require("../../helpers/messages");
let revisionService = require("../../services/teacher/revision.teacher.service");
let courseService = require("../../services/teacher/course.teacher.service");

exports.index = async (req, res, next) => {
    let { courseId } = req.params;

    let courseRevisions = await revisionService.getCourseRevisons({ _id: courseId });

    if (!courseRevisions)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound
        })

    res.status(status.OK).json({
        success: true,
        courseRevisions
    })
}

exports.store = async (req, res, next) => {
    let { courseId } = req.params;
    let { name, arrangement, video, exam, description } = req.body;

    let revision = await revisionService.createRevision({
        name,
        arrangement,
        video,
        exam,
        description
    });

    await courseService.addRevisionToCourse({ _id: courseId }, revision._id);

    res.status(status.OK).json({
        success: true,
        message: messages.revision.success.create,
        revision
    });
}

exports.show = async (req, res, next) => {
    let { revisionId } = req.params;

    let revision = await revisionService.getRevision({ _id: revisionId });

    if (!revision)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound
        })

    res.status(status.OK).json({
        success: true,
        revision
    });
}

exports.update = async (req, res, next) => {
    let { revisionId } = req.params;
    let { name, video, description } = req.body;

    await revisionService.updateRevision({ _id: revisionId }, {
        name,
        video,
        description
    });

    res.status(status.OK).json({
        success: true,
        message: messages.revision.success.update
    });
}

exports.destroy = async (req, res, next) => {
    let { courseId, revisionId } = req.params;

    let deletedRevision = await revisionService.deleteRevision({ _id: revisionId });

    if (deletedRevision === false)
        throw new APIError(status.CLIENT_ERROR, {
            success: false,
            message: messages.revision.faild.delete
        });

    await courseService.deleteRevisionFromCourse(courseId, revisionId);

    res.status(status.OK).json({
        success: true,
        message: messages.revision.success.delete
    });
}