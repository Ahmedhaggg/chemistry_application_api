const APIError = require("../../errors/api.error");
let unitService = require("../../services/students/courseUnit.student.service");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");
let examService = require("../../services/students/exams.student.service");


exports.store = async (req, res, next) => {
    let { unitId, name } = req.body
}

exports.showUnitsExamsDegrees = async (req, res, next) => {
    let { id } = req.student;

    let studentExamsDegrees = await examService.getStudentExamsDegrees({ studentId: id });

    if (!studentExamsDegrees)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            studentExamsDegrees
        });

    res.status(status.OK).json({
        success: true,
        studentExamsDegrees
    })
}

exports.showUnitExamDegree = async (req, res, next) => {
    let { unitId } = req.params;
    let { id } = req.student;

    let UnitExamsDegree = await examService.getStudentUnitExams({ studentId: id, unitId });

    if (!UnitExamsDegree)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            UnitExamsDegree
        });

    res.status(status.OK).json({
        success: true,
        UnitExamsDegree
    })

}

exports.showUnitLessonsExamsDegrees = async (req, res, next) => {
    let { unitId } = req.params;
    let { id } = req.student;

    let UnitLessonsExamsDegrees = await examService.getStudentUnitLessonsExams({ studentId: id, unitId });

    if (!UnitLessonsExamsDegrees)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            UnitLessonsExamsDegrees
        });

    res.status(status.OK).json({
        success: true,
        UnitLessonsExamsDegrees
    })
}

exports.showLessonsDegree = async (req, res, next) => {
    let { unitId, lessonId } = req.params;
    let { id } = req.student;

    let lessonExamDegree = await examService.getStudentUnitLessonsExams({ studentId: id, unitId, lessonId });

    if (!lessonExamDegree)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            lessonExamDegree
        });

    res.status(status.OK).json({
        success: true,
        lessonExamDegree
    })
}