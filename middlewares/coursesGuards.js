const APIError = require("../errors/api.error");
const status = require("../errors/status");
const messages = require("../helpers/messages");
let studentService = require("../services/students/index.student.service");
let unitService = require("../services/students/courseUnit.student.service");

exports.isStudentCourse = async (req, res, next) => {
    try {
        let { currentCourseId } = req.student;
        let { courseId } = req.params;

        if (courseId === currentCourseId)
            return next();

        let newError = new APIError(status.NOT_FOUND, {
            success: false,
            errorName: "notFoundError",
            message: messages.notFound
        });

        next(newError);
    } catch (error) {

        let newError = new APIError(status.INTERNAL_SERVER_ERROR, {
            success: false,
            errorName: "serverError",
            message: messages.notFound
        });

        next(newError);
    }
}


exports.isAvailableLesson = async (req, res, next) => {
    try {
        let studentId = req.student.id;
        let { unitId, lessonId } = req.params;

        let student = await studentService.getStudentCourseProgress({ _id: studentId });

        if (student.courseProgress.currentUnit.lessonId === lessonId)
            return next();

        let unitAndLesson = await unitService.getUnitAndLesson(unitId, lessonId);

        if (unitAndLesson.arrangement > student.courseProgress.currentUnit.arrangement) {
            let error = new APIError(status.NOT_FOUND, {
                message: messages.notFound
            });
            return next(error);
        }

        if (unitAndLesson.lessons[0].arrangement > student.courseProgress.currentLesson.arrangement) {
            let error = new APIError(status.NOT_FOUND, {
                message: messages.notFound
            });
            return next(error);
        }

        next();

    } catch (error) {

        let newError = new APIError(status.INTERNAL_SERVER_ERROR, {
            success: false,
            errorName: "serverError",
            message: messages.somethingWenWrong
        });

        next(newError);
    }
}

exports.isAvailableUnitRevision = async (req, res, next) => {

}

exports.isAvailableCourseRevisiom = async (req, res, next) => {

}