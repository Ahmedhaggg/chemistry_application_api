const APIError = require("../../errors/api.error");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");
let courseExamsDegreeService = require("../../services/students/studentCourseExam.student.service");


exports.store = async (req, res, next) => {
    let { degree, revisionId } = req.body;
    let studentId = req.student.id;
    
    await courseExamsDegreeService.addStudentRevisionExamToCourseStudentExam({ studentId }, { revisionId, degree });

    res.status(status.OK).json({
        success: true,
        message: messages.examDegree.success.saveRevisionExamDegree
    });
}

exports.index = async (req, res, next) => {
    let studentId = req.student.id;

    let courseRevisionsExamsDegrees = await courseExamsDegreeService.getAllRevisionsExamsDegrees({ studentId });

    if (!courseRevisionsExamsDegrees)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            courseRevisionsExamsDegrees
        });

    res.status(status.OK).json({
        success: true,
        courseRevisionsExamsDegrees
    })
}

exports.show = async (req, res, next) => {
    let { revisionId } = req.params;
    let { id } = req.student;

    let revisionDegree = await courseExamsDegreeService.getCourseRevisionExamDegree({ studentId: id }, revisionId);
    
    if (!revisionDegree)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            revisionDegree
        });

    res.status(status.OK).json({
        success: true,
        revisionDegree
    })
}