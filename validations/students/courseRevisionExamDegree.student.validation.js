let messages = require("../../helpers/messages");
let { check } = require("express-validator");

module.exports = {
    validate: action => {
        switch (action) {
            case "create":
                return [
                    check("grade").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber),
                ]
        }
    }
}