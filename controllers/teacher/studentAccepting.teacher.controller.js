const APIError = require("../../errors/api.error");
let status = require("../../errors/status");
let messages = require("../../helpers/messages");
let studentService = require("../../services/teacher/student.teacher.service");
let examService = require("../../services/teacher/studentExam.teacher.service");
let courseService = require("../../services/teacher/course.teacher.service");
let unitService = require("../../services/teacher/courseUnit.teacher.service");
let gradeService = require("../../services/teacher/grade.teacher.service");


exports.count = async (req, res, next) => {
    let { grade } = req.query;
    let numberOfStudents = await studentService.countunAcceptingStudents(grade ? { grade } : null);
    res.status(status.OK).json({
        success: true,
        numberOfStudents
    })
}

exports.index = async (req, res, next) => {
    let { limit, offset, grade } = req.query;
    console.log(grade)
    let unAcceptedStudents = await studentService.getAllUnAcceptedStudent(grade ? { grade } : {} , limit, offset);
    
    res.status(status.OK).json({
        success: true,
        unAcceptedStudents
    })
}

exports.show = async (req, res, next) => {
    let { studentId } = req.params;
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
    let { nextRevision, nextUnit, nextLesson, nextUnitRevision, courseId } = req.body;

    let student = await studentService.getUnAcceptedStudent({ _id: studentId }, ["_id currentCourse grade"]);
    
    await gradeService.incrementNumberOfStudents(student.grade);

    if (!student)
        throw new APIError(status.NOT_FOUND, { message: messages.notFound });

    if (!nextUnit) {
        let firstUnit = await courseService.getFirstUnitInCourse(courseId);
        nextUnit = { _id: firstUnit._id, arrangement: firstUnit.arrangement };
        nextLesson = firstUnit.lessons[0];
    }
        
    if (nextUnit && !nextLesson && nextUnitRevision) {
        let lastLessonInUnit = await unitService.getLastLesson(nextUnit._id);
        nextLesson = { _id: lastLessonInUnit._id, arrangement: lastLessonInUnit.arrangement }
    }
    await studentService.updateStudent({ _id: studentId }, {
        accepted: true,
        courseProgress: {
            currentUnit: { unitId: nextUnit._id, arrangement: nextUnit.arrangement },
            currentLesson: { lessonId: nextLesson._id, arrangement: nextLesson.arrangement },
            currentUnitRevision: nextUnitRevision || null
        },
        CourseRevisionProgress: nextRevision || null
    });

    let unitExam = await examService.createStudentUnitExam({ studentId: student._id, unitId: nextUnit._id });
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