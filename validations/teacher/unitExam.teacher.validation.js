let messages = require("../../helpers/messages");
let { check } = require("express-validator");

module.exports = {
    validate: action => {
        switch (action) {
            case "create":
                return [
                    check("degree").notEmpty().withMessage(messages.genrale.required),
                    check("questions").not().isEmpty().withMessage(messages.genrale.required),
                    check("questions[*]question").not().isEmpty().withMessage(messages.genrale.required),
                    check("questions[*]answers").not().isEmpty().withMessage(messages.genrale.required),
                    check("questions[*]correctAnswer").not().isEmpty().withMessage(messages.genrale.required)
                ];
        }
    }
}