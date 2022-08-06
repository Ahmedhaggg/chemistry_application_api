const APIError = require("../../errors/api.error");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");
let unitExamsDegreeService = require("../../services/students/studentUnitExam.student.service");

exports.index = async (req, res, next) => {
    let { unitId } = req.params;
    let studentId = req.student.studentId;

    let unitLessonsDegrees = await unitExamsDegreeService.getUnitLessonsDegrees({ studentId, unitId });

    if (!unitLessonsDegrees)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound,
            unitLessonsDegrees
        });

    res.status(status.OK).json({
        success: true,
        unitLessonsDegrees
    });
}

exports.store = async (req, res, next) => {
    let { unitId, lessonId } = req.params;
    let { degree } = req.body;
    let studentId = req.student.id;

    await unitExamsDegreeService.addLessonDegree({ unitId, studentId }, { lessonId, degree });

    res.status(status.Ok).json({
        success: true,
        message: messages.examDegree.success.saveLessonExamDegree
    });
}

exports.show = async (req, res, next) => {
    let { unitId, lessonId } = req.params;
    let studentId = req.student.id;

    let lessonDegree = await unitExamsDegreeService.getLessonDegree({ unitId, studentId }, lessonId);

    if (!lessonDegree)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound,
            lessonDegree
        });

    res.status(status.OK).json({
        success: true,
        lessonDegree
    });
}