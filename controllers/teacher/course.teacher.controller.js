let courseService = require("../../services/teacher/course.teacher.service");
let status = require("../../errors/status");
const APIError = require("../../errors/api.error");
const messages = require("../../helpers/messages");

exports.index = async (req, res, next) => {
    let courses = await courseService.getAllCourses();
    res.status(status.OK).json({
        success: true,
        courses
    })
}

exports.store = async (req, res, next) => {
    let { name, numberOfUnits, numberOfRevisions } = req.body;

    let newCourse = await courseService.createCourse({ name, numberOfUnits, numberOfRevisions });

    res.status(status.OK).json({
        success: true,
        newCourse,
        message: messages.course.success.create
    });
}

exports.show = async (req, res, next) => {
    let { courseId } = req.params;

    let course = await courseService.getCourse({ _id: courseId });

    if (!course)
        throw new APIError(status.NOT_FOUND, {
            errorName: "notFoundError",
            message: messages.notFound
        });

    res.status(status.OK).json({
        success: true,
        course
    });
}

exports.update = async (req, res, next) => {
    let { courseId } = req.params;
    let { name, numberOfUnits, numberOfRevisions } = req.body;

    let updateCourse = await courseService.updateCourse({ _id: courseId }, { name, numberOfUnits, numberOfRevisions });

    if (updateCourse === false)
        throw new APIError(status.INTERNAL_SERVER_ERROR, {
            message: messages.course.faild.update
        });

    res.status(status.OK).json({
        success: true,
        message: messages.course.success.update
    });
}
