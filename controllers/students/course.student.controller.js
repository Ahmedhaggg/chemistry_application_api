let courseService = require("../../services/students/course.student.service");
let status = require("../../errors/status");

exports.show = async (req, res, next) => {
    let { courseId } = req.params;

    let course = await courseService.getCourse({ _id: courseId });

    res.status(status.OK).json({
        success: true,
        course
    });
}
