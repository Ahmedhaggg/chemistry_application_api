const APIError = require("../errors/api.error");
const status = require("../errors/status");
const messages = require("../helpers/messages");

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
        console.log(error)
        let newError = new APIError(status.INTERNAL_SERVER_ERROR, {
            success: false,
            errorName: "serverError",
            message: messages.notFound
        });

        next(newError);
    }
}