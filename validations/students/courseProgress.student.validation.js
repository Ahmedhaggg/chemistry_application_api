let messages = require("../../helpers/messages");
let { check } = require("express-validator");

module.exports = {
    validate: action => {
        switch (action) {
            case "updateUnitProgress":
                return [
                    check("nextUnit[unitId]").notEmpty().withMessage(messages.genrale.required),
                    check("nextUnit[arrangement]").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber),
                    check("nextLesson[lessonId]").notEmpty().withMessage(messages.genrale.required),
                    check("nextLesson[arrangement]").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber)
                ];
            case "updateLessonProgress":
                return [
                    check("nextLesson[lessonId]").notEmpty().withMessage(messages.genrale.required),
                    check("nextLesson[arrangement]").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber)
                ];
            case "updateUnitRevisionProgress":
                return [
                    check("nextRevision[revisionId]").notEmpty().withMessage(messages.genrale.required),
                    check("nextRevision[arrangement]").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber)
                ];
            case "updateCourseRevisionProgress":
                return [
                    check("nextRevision[revisionId]").notEmpty().withMessage(messages.genrale.required),
                    check("nextRevision[arrangement]").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber)
                ];
        }
    }
}