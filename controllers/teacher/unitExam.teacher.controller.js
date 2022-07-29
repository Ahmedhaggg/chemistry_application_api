const APIError = require("../../errors/api.error");
let status = require("../../errors/status");
let messages = require("../../helpers/messages");
let unitService = require("../../services/teacher/courseUnit.teacher.service");

exports.store = async (req, res, next) => {
    let { unitId } = req.params;

    let { degree, questions } = req.body;

    let unit = await unitService.getSomeFieldsFromUnit({ _id: unitId }, ["exam"]);

    if (unit.exam)
        throw new APIError(status.NOT_FOUND, {
            message: messages.unitExam.faild.create
        });

    await unitService.updateUnit({ _id: unitId }, { exam: { degree, questions } });

    res.status(status.OK).json({
        success: true,
        message: messages.unitExam.success.create
    })

}
