let courseUnitService = require("../../services/students/courseUnit.student.service");
const APIError = require("../../errors/api.error");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");

exports.show = async (req, res, next) => {
    let { unitId } = req.params;

    let unit = await courseUnitService.getUnit({ _id: unitId });

    if (!unit)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound,
            unit
        });

    res.status(status.OK).json({
        success: true,
        unit
    })
}

