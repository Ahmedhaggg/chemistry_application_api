let studentService = require("../../services/students/index.student.service");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");
const APIError = require("../../errors/api.error");
const { compare } = require("../../helpers/hash");
let jwt = require("../../helpers/jwt");
const roles = require("../../helpers/roles");

exports.register = async (req, res, next) => {
    let { name, email, password, phoneNumber, grade, currentCourse } = req.body;

    let studentId = await studentService.createStudent({
        name,
        email,
        password,
        phoneNumber,
        grade,
        currentCourse
    });

    res.status(status.OK).json({
        success: true,
        message: messages.register.success,
        studentId
    });

};

exports.login = async (req, res, next) => {
    let { email, password } = req.body;

    let student = await studentService.getStudentLoginData({ email });
    if (!student)
        throw new APIError(status.CLIENT_ERROR, {
            errorName: "loginError",
            message: messages.login.faild.email
        });
    console.log(student)
    if (student.accepted === false)
        throw new APIError(status.UNAUTHENTICATED, {
            errorName: "loginError",
            message: messages.login.faild.unaccepted
        });

    let checkPassword = await compare(password, student.password);

    if (checkPassword === false)
        throw new APIError(status.CLIENT_ERROR, {
            errorName: "loginError",
            message: messages.login.faild.password
        });

    let token = await jwt.createJwtToken({
        id: student._id,
        role: roles.STUDENT
    }, "7d");

    res.status(status.OK).json({
        success: true,
        token,
        message: messages.login.success
    });

}

exports.getAcceptedResult = async (req, res, next) => {
    let { studentId } = req.params;

    let student = await studentService.getStudentLoginData({ _id: studentId });

    if (student.accepted === false)
        throw new APIError(status.UNAUTHENTICATED, {
            errorName: "authenticatedError",
            message: messages.login.faild.unaccepted
        });

    let token = await jwt.createJwtToken({
        id: student._id,
        role: roles.STUDENT
    }, "7d");

    res.status(status.OK).json({
        success: true,
        token,
        message: messages.login.success
    });

}
