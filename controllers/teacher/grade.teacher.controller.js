let gradeService = require("../../services/teacher/grade.teacher.service");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");

exports.index = async (req, res, next) => {
    let grades = await gradeService.getAllGrades();

    res.status(status.OK).json({
        success: true,
        grades
    })
}

exports.store = async (req, res, next) => {
    let { name, currentCourse } = req.body;

    let newGrade = await gradeService.createGrade({ name, currentCourse });

    res.status(status.OK).json({
        success: true,
        newGrade,
        message: messages.grade.success.create
    });
}

exports.show = async (req, res, next) => {
    let { gradeId } = req.params;

    let grade = await gradeService.getGrade({ _id: gradeId });

    if (!grade)
        throw new APIError(status.NOT_FOUND, {
            errorName: "notFoundError",
            message: messages.notFound
        });

    res.status(status.OK).json({
        success: true,
        grade
    });
}

exports.update = async (req, res, next) => {
    let { gradeId } = req.params;
    let { name, currentCourse } = req.body;

    let updateGrade = await gradeService.updateGrade({ _id: gradeId }, { name, currentCourse });

    if (updateGrade === false)
        throw new APIError(status.INTERNAL_SERVER_ERROR, {
            message: messages.grade.faild.update
        });

    res.status(status.OK).json({
        success: true,
        message: messages.grade.success.update
    });
}