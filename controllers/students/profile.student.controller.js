const APIError = require("../../errors/api.error");
let studentService = require("../../services/students/index.student.service");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");

exports.show = async (req, res, next) => {
    let { id } = req.student;

    let profile = await studentService.getStudentProfileData({ _id: id });

    if (!profile)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound,
            profile
        });

    res.status(status.OK).json({
        success: true,
        profile
    })
}