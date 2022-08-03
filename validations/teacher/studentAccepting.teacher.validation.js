let messages = require("../../helpers/messages");
let { check } = require("express-validator");

module.exports = {
    validate: action => {
        switch (action) {
            case "accept":
                return [
                    // check("nextRevisionId").notEmpty().withMessage(messages.genrale.required),
                    check("nextUnitId").notEmpty().withMessage(messages.genrale.required),
                    check("nextLessonId").notEmpty().withMessage(messages.genrale.required),
                    // check("nextUnitRevisionId").notEmpty().withMessage(messages.genrale.required)
                ];

        }
    }
}