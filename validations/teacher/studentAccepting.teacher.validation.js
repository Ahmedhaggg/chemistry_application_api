let messages = require("../../helpers/messages");
let { check } = require("express-validator");

module.exports = {
    validate: action => {
        switch (action) {
            case "accept":
                return [
                    // check("nextRevisionId").notEmpty().withMessage(messages.genrale.required),
                    check("nextUnit[unitId]").notEmpty().withMessage(messages.genrale.required),
                    check("nextUnit[arrangement]").notEmpty().withMessage(messages.genrale.required),
                    check("nextLesson[lessonId]").notEmpty().withMessage(messages.genrale.required),
                    check("nextLesson[arrangement]").notEmpty().withMessage(messages.genrale.required),
                    // check("nextUnitRevisionId").notEmpty().withMessage(messages.genrale.required)
                ];

        }
    }
}