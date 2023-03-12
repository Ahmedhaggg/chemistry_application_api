const APIError = require("../../errors/api.error");
let status = require("../../errors/status");
let messages = require("../../helpers/messages");
let studentService = require("../../services/teacher/student.teacher.service");

exports.count = async (req, res, next) => {
    let { grade } = req.query;
    let numberOfStudents = await studentService.countAcceptingStudents(grade ? { grade } : null);
    res.status(status.OK).json({
        success: true,
        numberOfStudents
    })
}

exports.index = async (req, res, next) => {
    let {
        limit,
        offset,
        grade
    } = req.query;

    let students = await studentService.getAllAcceptingStudents(grade ? { grade } : {}, { limit, offset });

    res.status(status.OK).json({
        success: true,
        students
    });
}
exports.show = async (req, res, next) => {
    let { studentId } = req.params;
    let student = await studentService.getStudent({ _id: studentId });

    if (!student)
        throw new APIError(status.NOT_FOUND, {
            errorName: "notFoundError",
            message: messages.notFound
        });

    res.status(status.OK).json({
        success: true,
        student
    })
}

// exports.destroy = async (req, res, next) => {
//     let { studentId } = req.params;

//     let deletedStudent = await studentService.deleteUnAcceptedStudent({ _id: studentId });

//     if (!deletedStudent)
//         throw new APIError(status.CLIENT_ERROR, {
//             errorName: "notFoundError",
//             message: messages.acceptedStudent.faild.delete
//         });

//     res.status(status.OK).json({
//         success: true,
//         message: messages.acceptedStudent.success.delete
//     });
// }
