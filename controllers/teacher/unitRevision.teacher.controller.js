const APIError = require("../../errors/api.error");
let status = require("../../errors/status");
let messages = require("../../helpers/messages");
let revisionService = require("../../services/teacher/revision.teacher.service");
let unitService = require("../../services/teacher/courseUnit.teacher.service");

exports.index = async (req, res, next) => {
    let { unitId } = req.params;

    let unitRevisions = await revisionService.getUnitRevisons({ _id: unitId });
    if (!unitRevisions)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound
        })

    res.status(status.OK).json({
        success: true,
        unitRevisions
    })
}

exports.store = async (req, res, next) => {
    let { unitId } = req.params;
    let { name, arrangement, video, exam, description } = req.body;
    console.log(exam)
    let revision = await revisionService.createUnitRevision({
        name,
        arrangement,
        video,
        exam,
        description
    });

    await unitService.addRevisonToUnit({ _id: unitId }, { revisionId: revision._id, name, arrangement });

    res.status(status.OK).json({
        success: true,
        message: messages.revision.success.create,
        revision
    });
}

exports.show = async (req, res, next) => {
    let { revisionId } = req.params;

    let revision = await revisionService.getUnitRevision({ _id: revisionId });

    if (!revision)
        throw new APIError(status.NOT_FOUND, {
            success: false,
            message: messages.notFound
        })

    res.status(status.OK).json({
        success: true,
        revision
    });
}

exports.update = async (req, res, next) => {
    let { unitId, revisionId } = req.params;
    let { name, arrangement, video, description } = req.body;

    await revisionService.updateUnitRevision({ _id: revisionId }, {
        name,
        arrangement,
        video,
        description
    });

    await unitService.updateRevisionInUnit(unitId, revisionId, { arrangement, name });

    res.status(status.OK).json({
        success: true,
        message: messages.revision.success.update
    });
}

exports.destroy = async (req, res, next) => {
    let { unitId, revisionId } = req.params;

    let deletedRevision = await revisionService.deleteUnitRevision({ _id: revisionId });

    if (deletedRevision === false)
        throw new APIError(status.CLIENT_ERROR, {
            success: false,
            message: messages.revision.faild.delete
        });

    await unitService.deleteRevisionFromUnit(unitId, revisionId);

    res.status(status.OK).json({
        success: true,
        message: messages.revision.success.delete
    });
}