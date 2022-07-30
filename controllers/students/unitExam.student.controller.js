const APIError = require("../../errors/api.error");
let unitService = require("../../services/students/courseUnit.student.service");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");

exports.show = async (req, res, next) => {
    let { unitId } = req.params;

    let unitExam = await unitService.getExam({ _id: unitId });

    if (!unitExam)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            unitExam
        });

    res.status(status.OK).json({
        success: true,
        exam: unitExam
    })

}