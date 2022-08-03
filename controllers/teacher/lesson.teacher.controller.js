const APIError = require("../../errors/api.error");
let status = require("../../errors/status");
let messages = require("../../helpers/messages");
let lessonService = require("../../services/teacher/lesson.teacher.service");
let unitService = require("../../services/teacher/courseUnit.teacher.service");

exports.show = async (req, res, next) => {
    let { lessonId } = req.params;

    let lesson = await lessonService.getLesson({ _id: lessonId });

    if (!lesson)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound
        })

    res.status(status.OK).json({
        success: true,
        lesson
    });

}

exports.store = async (req, res, next) => {
    let { unitId } = req.params;
    let { name, arrangement, video, exam, description } = req.body;

    let lesson = await lessonService.createLesson({
        name,
        arrangement,
        video,
        exam,
        description
    });

    await unitService.addLessonToUnit({ _id: unitId }, lesson._id);

    res.status(status.OK).json({
        success: true,
        message: messages.lesson.success.create,
        lesson
    });
}

exports.update = async (req, res, next) => {
    let { lessonId } = req.params;
    let { name, video, description } = req.body;
    await lessonService.updateLesson({ _id: lessonId }, {
        name,
        video,
        description
    });

    res.status(status.OK).json({
        success: true,
        message: messages.lesson.success.update
    });

}

exports.destroy = async (req, res, next) => {
    let { unitId, lessonId } = req.params;

    let deletedLesson = await lessonService.deleteLesson({ _id: lessonId });

    if (deletedLesson === false)
        throw new APIError(status.CLIENT_ERROR, {
            success: false,
            message: messages.lesson.faild.delete
        });

    await unitService.deleteLessonFromUnit(unitId, lessonId);

    res.status(status.OK).json({
        success: true,
        message: messages.lesson.success.delete
    });
}