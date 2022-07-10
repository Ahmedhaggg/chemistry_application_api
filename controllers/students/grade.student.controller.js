let gradeService = require("../../services/students/grade.student.service")
let status = require("../../errors/status")
exports.index = async (req, res, next) => {
    let grades = await gradeService.getAllGrades();

    res.status(status.OK).json({
        success: true,
        grades
    })
} 