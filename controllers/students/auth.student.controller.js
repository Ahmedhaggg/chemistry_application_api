let studentService = require("../../services/students/index.student.service");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");
const APIError = require("../../errors/api.error");
const { compare } = require("../../helpers/hash");
let jwt = require("../../helpers/jwt");
const roles = require("../../helpers/roles");

exports.register = async (req, res, next) => {
    let { name, email, password, phoneNumber, gradeId, currentCourseId } = req.body;

    let _id = await studentService.createStudent({
        name,
        email,
        password,
        phoneNumber,
        gradeId,
        currentCourseId
    });

    res.status(status.OK).json({
        success: true,
        message: messages.register.success,
        studentId: _id
    });

};

exports.login = async (req, res, next) => {
    let { email, password } = req.body;

    let student = await studentService.getStudentLoginData({ email });

    if (student)
        throw new APIError(status.INTERNAL_SERVER_ERROR, messages.login.faild.email);

    if (student.accepted === false)
        throw new APIError(status.unAuthenticated, messages.login.faild.unaccepted);

    let checkPassword = await compare(password, student.password);

    if (checkPassword === false)
        throw new APIError(status.INTERNAL_SERVER_ERROR, messages.login.faild.password);

    let token = jwt.createJwtToken({
        id: student._id,
        role: roles.STUDENT
    });

    res.status(status.OK).json({
        success: true,
        token,
        message: messages.login.success
    });

}

exports.getAcceptedResult = async (req, res, next) => {
    let { studentId } = req.params;

    let studentIsAccepted = await studentService.getStudentLoginData({ _id: studentId });

    if (studentIsAccepted === false)
        throw new APIError(status.unAuthenticated, messages.login.faild.unaccepted);

    let token = jwt.createJwtToken({
        id: student._id,
        role: roles.STUDENT
    });

    res.status(status.OK).json({
        success: true,
        token,
        message: messages.login.success
    });

}

// 62caea93d19d5529cb0b8af2
// 62caeaf6d19d5529cb0b8af4
// 62caeafad19d5529cb0b8af5