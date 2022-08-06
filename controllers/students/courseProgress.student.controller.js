let studentService = require("../../services/students/index.student.service");
let StudentUnitExamService = require("../../services/students/studentUnitExam.student.service");
let studentCourseExamService = require("../../services/students/studentCourseExam.student.service");
const APIError = require("../../errors/api.error");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");

exports.updateCourseUnitProgress = async (req, res, next) => {
    let { id } = req.student;
    let { nextUnit, nextLesson } = req.body;

    await studentSevrice.updateCourseUnitProgress({ _id: id }, { nextUnit, nextLesson });

    let newStudentUnitExams = await StudentUnitExamService.createStudentUnitExam({ studentId: id }, { nextUnit, nextLesson });

    await studentCourseExamService.addStudentUnitExamToCourseStudentExam({ studentId }, newStudentUnitExams._id)

    res.status(status.OK).json({
        success: true,
        message: messages.student.courseProgress.success.openNewUnit
    });
}

exports.updateUnitLessonProgress = async (req, res, next) => {
    let { id } = req.student;
    let { nextLesson } = req.body;

    await studentSevrice.updateUnitLessonProgress({ _id: id }, nextLesson);

    res.status(status.OK).json({
        success: true,
        message: messages.student.courseProgress.success.openNewLesson
    });
}
exports.updateUnitRevisionProgress = async (req, res, next) => {
    let { id } = req.student;
    let { nextUnitRevision } = req.body;

    await studentSevrice.updateUnitRevisionProgress({ _id: id }, nextUnitRevision);

    res.status(status.OK).json({
        success: true,
        message: messages.student.courseProgress.success.openNewUnitRevision
    });
}

exports.updateCourseRevisionProgress = async (req, res, next) => {
    let { id } = req.user;
    let { nextRevision } = req.body;

    await studentSevrice.updateCourseRevisionProgress({ _id: id }, nextRevision);

    res.status(status.OK).json({
        success: true,
        message: messages.student.courseProgress.success.openNewCourseRevision
    });
}
