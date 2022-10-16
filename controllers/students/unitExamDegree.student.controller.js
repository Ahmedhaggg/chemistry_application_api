const APIError = require("../../errors/api.error");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");
let unitExamDegreeService = require("../../services/students/studentUnitExam.student.service");
let courseExamsDegreeService = require("../../services/students/studentCourseExam.student.service");


exports.store = async (req, res, next) => {
    let { unitId, degree } = req.body;
    let studentId = req.student.id;

    await unitExamDegreeService.saveUnitDegree({ unitId, studentId }, degree);
    
    res.status(status.OK).json({
        success: true,
        message: messages.examDegree.success.saveUnitExamDegree
    });
}

exports.index = async (req, res, next) => {
    let { id } = req.student;

    let unitsExamsDegrees = await courseExamsDegreeService.getAllUnitsExamsDegrees({ studentId: id });

    if (!unitsExamsDegrees)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            unitsExamsDegrees
        });

    res.status(status.OK).json({
        success: true,
        unitsExamsDegrees
    })
}

exports.show = async (req, res, next) => {
    let { unitId } = req.params;
    let { id } = req.student;

    let UnitExamDegree = await unitExamDegreeService.getUnitDegree({ studentId: id, unitId });

    if (!UnitExamDegree)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            UnitExamDegree
        });

    res.status(status.OK).json({
        success: true,
        UnitExamDegree
    });
}
