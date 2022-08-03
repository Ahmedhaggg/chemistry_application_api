let unitService = require("../../services/teacher/courseUnit.teacher.service");
let courseService = require("../../services/teacher/course.teacher.service");
let messages = require("../../helpers/messages");
let status = require("../../errors/status");
const APIError = require("../../errors/api.error");

exports.index = async (req, res, next) => {
    let { courseId } = req.params;

    let units = await courseService.getCourseUnits({ _id: courseId });

    res.status(status.OK).json({
        success: true,
        courseId,
        units: units.units
    })
}

exports.store = async (req, res, next) => {
    let { courseId } = req.params;
    let { name, arrangement, numberOfLessons, numberOfRevisions } = req.body;

    let newUnit = await unitService.createUnit({ name, arrangement, numberOfLessons, numberOfRevisions });

    await courseService.addUnitToCourse({ _id: courseId }, newUnit._id);

    res.status(status.OK).json({
        success: true,
        newUnit,
        message: messages.unit.success.create
    });
}

exports.show = async (req, res, next) => {
    let { unitId } = req.params;

    let unit = await unitService.getUnit({ _id: unitId });

    if (!unit)
        throw new APIError(status.NOT_FOUND, {
            errorName: "notFoundError",
            message: messages.notFound
        });

    res.status(status.OK).json({
        success: true,
        unit
    });
}

exports.update = async (req, res, next) => {
    let { unitId } = req.params;
    let { name, numberOfLessons, numberOfRevisions } = req.body;

    await unitService.updateUnit({ _id: unitId }, { name, numberOfLessons, numberOfRevisions });

    res.status(status.OK).json({
        success: true,
        message: messages.unit.success.update
    });
}