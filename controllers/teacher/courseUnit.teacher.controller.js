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
    let { name } = req.body;
    let numberOfUnitsInCourse =  await courseService.countCourseUnits(courseId)
    
    let newUnit = await unitService.createUnit({ name, arrangement: numberOfUnitsInCourse + 1 });

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
    let { name } = req.body;

    await unitService.updateUnit({ _id: unitId }, { name });

    res.status(status.OK).json({
        success: true,
        message: messages.unit.success.update
    });
}

exports.showNextUnitArrangement = async (req, res, next) => {
    let { courseId } = req.params;
    let lastUnitInCourseArrangement = await courseService.getLastUnitArragement({ _id: courseId });

    if (lastUnitInCourseArrangement == null)
        throw new APIError(status.NOT_FOUND, {
            errorName: "notFoundError",
            message: messages.notFound
        });

    res.status(status.OK).json({
        success: true,
        nextUnitArrangement: lastUnitInCourseArrangement + 1
    })
}