let teacherService = require("../../services/teacher/index.teacher.service");
let status = require("../../errors/status");
const APIError = require("../../errors/api.error");
let messages = require("../../helpers/messages");
const { compare } = require("../../helpers/hash");
let roles = require("../../helpers/roles");

exports.register = async (req, res, next) => {
    let { email, password } = req.body;
    await teacherService.createTeacher({ email, password });
    res.status(status.OK).json({
        success: true,
        message: "teacher is created successfully"
    });
}

exports.login = async (req, res, next) => {
    let { email, password } = req.body;

    let teacher = await teacherService.getTeacherLoginData({ email });

    if (!teacher)
        throw new APIError(status.CLIENT_ERROR, {
            success: false,
            errorName: "loginError",
            message: messages.login.faild.email
        });

    let isTruePassword = await compare(password, teacher.password);

    if (isTruePassword === false)
        throw new APIError(status.CLIENT_ERROR, {
            success: false,
            errorName: "loginError",
            message: messages.login.faild.password
        });

    let token = await jwt.createJwtToken({
        role: roles.TEACHER
    }, "30d");

    res.status(status.OK).json({
        success: true,
        token,
        message: messages.login.success
    });
}