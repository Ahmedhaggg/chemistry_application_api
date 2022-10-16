let studentService = require("../../services/students/index.student.service");
let StudentUnitExamService = require("../../services/students/studentUnitExam.student.service");
let studentCourseExamService = require("../../services/students/studentCourseExam.student.service");
const APIError = require("../../errors/api.error");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");

exports.updateCourseUnitProgress = async (req, res, next) => {
    let { id } = req.student;
    let { nextUnit, nextLesson } = req.body;
    
    await studentService.updateCourseUnitProgress({ _id: id }, { nextUnit, nextLesson });

    let newStudentUnitExams = await StudentUnitExamService.createStudentUnitExam({ studentId: id, unitId: nextUnit.unitId });

    await studentCourseExamService.addStudentUnitExamToCourseStudentExam({ studentId: id }, newStudentUnitExams._id)

    res.status(status.OK).json({
        success: true,
        message: messages.student.courseProgress.success.openNewUnit
    });
}

exports.updateUnitLessonProgress = async (req, res, next) => {
    let { id } = req.student;
    let { nextLesson } = req.body;

    await studentService.updateUnitLessonProgress({ _id: id }, nextLesson);

    res.status(status.OK).json({
        success: true,
        message: messages.student.courseProgress.success.openNewLesson
    });
}

exports.updateUnitRevisionProgress = async (req, res, next) => {
    let { id } = req.student;
    let { nextRevision } = req.body;

    await studentService.updateUnitRevisionProgress({ _id: id }, nextRevision);

    res.status(status.OK).json({
        success: true,
        message: messages.student.courseProgress.success.openNewUnitRevision
    });
}

exports.updateCourseRevisionProgress = async (req, res, next) => {
    let { id } = req.student;
    let { nextRevision } = req.body;

    await studentService.updateCourseRevisionProgress({ _id: id }, nextRevision);

    res.status(status.OK).json({
        success: true,
        message: messages.student.courseProgress.success.openNewCourseRevision
    });
}
