let revisionService = require("../../services/students/revision.student.service");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");
const APIError = require("../../errors/api.error");

exports.index = async (req, res, next) => {
    let { unitId } = req.params;

    let unitRevisions = await revisionService.getUnitRevisons({ _id: unitId });

    if (!unitRevisions)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound,
            unitRevisions
        });

    res.status(status.OK).json({
        success: true,
        unitRevisions
    })
}

exports.show = async (req, res, next) => {
    let { unitId, revisionId } = req.params;
    
    let unitRevision = await revisionService.getUnitRevision(unitId, revisionId);

    if (!unitRevision)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound,
            unitRevision
        });

    res.status(status.OK).json({
        success: true,
        unitRevision
    })
}