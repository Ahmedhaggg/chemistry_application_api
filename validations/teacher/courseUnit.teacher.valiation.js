let messages = require("../../helpers/messages");
let { check } = require("express-validator");

module.exports = {
    validate: action => {
        switch (action) {
            case "create":
                return [
                    check("name").notEmpty().withMessage(messages.genrale.required),
                    check("arrangement").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber),
                    check("numberOfRevisions").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber),
                    check("numberOfLessons").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber),
                ];
            case "update":
                return [
                    check("name").notEmpty().withMessage(messages.genrale.required),
                    check("numberOfRevisions").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber),
                    check("numberOfLessons").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber),
                ];
        }
    }
}