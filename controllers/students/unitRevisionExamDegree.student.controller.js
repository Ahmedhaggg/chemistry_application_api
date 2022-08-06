const APIError = require("../../errors/api.error");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");
let unitExamsDegreeService = require("../../services/students/studentUnitExam.student.service");

exports.index = async (req, res, next) => {
    let { unitId } = req.params;
    let studentId = req.student.studentId;

    let unitRevisionsDegrees = await unitExamsDegreeService.getUnitRevisionsDegrees({ studentId, unitId });

    if (!unitRevisionsDegrees)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound,
            unitRevisionsDegrees
        });

    res.status(status.OK).json({
        success: true,
        unitRevisionsDegrees
    });
}

exports.store = async (req, res, next) => {
    let { unitId, revisionId } = req.params;
    let { degree } = req.body;
    let studentId = req.student.id;

    await unitExamsDegreeService.addRevisionDegree({ unitId, studentId }, { revisionId, degree });

    res.status(status.Ok).json({
        success: true,
        message: messages.examDegree.success.saveRevisionExamDegree
    });
}

exports.show = async (req, res, next) => {
    let { unitId, revisionId } = req.params;
    let studentId = req.student.id;

    let revisionDegree = await unitExamsDegreeService.getLessonDegree({ unitId, studentId }, revisionId);

    if (!revisionDegree)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound,
            revisionDegree
        });

    res.status(status.OK).json({
        success: true,
        revisionDegree
    });
}