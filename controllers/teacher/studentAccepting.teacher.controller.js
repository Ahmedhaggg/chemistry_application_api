const APIError = require("../../errors/api.error");
let status = require("../../errors/status");
let messages = require("../../helpers/messages");
let studentService = require("../../services/teacher/student.teacher.service");
let examService = require("../../services/teacher/studentExam.teacher.service")
exports.index = async (req, res, next) => {
    let { limit, offset } = req.query;
    let unAcceptedStudents = await studentService.getAllUnAcceptedStudent({ limit, offset });

    res.status(status.OK).json({
        success: true,
        unAcceptedStudents
    })
}

exports.show = async (req, res, next) => {
    let unAcceptedStudent = await studentService.getUnAcceptedStudent({ _id: studentId });

    if (!unAcceptedStudent)
        throw new APIError(status.NOT_FOUND, { message: messages.notFound });

    res.status(status.OK).json({
        success: true,
        unAcceptedStudent
    });
}

exports.update = async (req, res, next) => {
    let { studentId } = req.params;
    let { nextRevision, nextUnit, nextLesson, nextUnitRevision } = req.body;

    let student = await studentService.getUnAcceptedStudent({ _id: studentId }, ["_id currentCourse"]);

    if (!student)
        throw new APIError(status.NOT_FOUND, { message: messages.notFound });

    await studentService.updateStudent({ _id: studentId }, {
        accepted: true,
        courseProgress: {
            currentUnit: nextUnit,
            currentLesson: nextLesson,
            currentRevision: nextUnitRevision || null
        },
        CourseRevisionProgress: nextRevision || null
    });

    let unitExam = await examService.createStudentUnitExam({ studentId: student._id, unitId: nextUnit.unitId });
    await examService.createStudentCourseExam({ studentId: student._id, courseId: student.currentCourse, unitsExams: [unitExam._id] });

    res.status(status.OK).json({
        success: true,
        message: messages.acceptedStudent.success.accepted
    });
}

exports.destroy = async (req, res, next) => {
    let { studentId } = req.params;

    let deletedUnAcceptedStudent = await studentService.deleteUnAcceptedStudent({ _id: studentId });

    if (deletedUnAcceptedStudent === false)
        throw new APIError(status.CLIENT_ERROR, {
            success: false,
            message: messages.acceptedStudent.faild.delete
        });

    await unitService.deleteLessonFromUnit(unitId, lessonId);

    res.status(status.OK).json({
        success: true,
        message: messages.acceptedStudent.success.delete
    });
}