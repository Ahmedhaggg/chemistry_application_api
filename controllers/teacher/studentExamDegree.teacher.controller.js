let studentExamService = require("../../services/teacher/studentExam.teacher.service");
let status = require("../../errors/status")
exports.index = async (req, res, next) => {
    let { studentId } = req.params;
    console.log(studentId)
    
    let studentExamsDegrees = await studentExamService.getStudentDegrees(studentId);

    console.log(studentExamsDegrees)
    res.status(status.OK).json({ examsDegrees: studentExamsDegrees });
}

exports.showUnitDegree = async (req, res, next) => {
    let { studentId, unitId } = req.params;

    let studentUnitExamsDegrees = await studentExamService.getStudentUnitExamsDegrees(studentId, unitId);
    
    return res.status( studentUnitExamsDegrees? status.OK : status.NOT_FOUND).json({
        success: studentUnitExamsDegrees ? true : false,
        studentUnitExamsDegrees
    }) 
}
