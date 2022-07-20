let lessonService = require("../../services/students/lesson.student.service");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");
const APIError = require("../../errors/api.error");

exports.show = async (req, res, next) => {
    let { lessonId } = req.params;

    let lesson = await lessonService.getLesson({ _id: lessonId });

    if (!lesson)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound,
            lesson
        });

    res.status(status.OK).json({
        success: true,
        lesson
    })
}
