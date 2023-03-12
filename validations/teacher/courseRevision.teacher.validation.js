let messages = require("../../helpers/messages");
let { check } = require("express-validator");

module.exports = {
    validate: action => {
        switch (action) {
            case "create":
                return [
                    check("name").notEmpty().withMessage(messages.genrale.required),
                    check("description").notEmpty().withMessage(messages.genrale.required),
                    check("video").notEmpty().withMessage(messages.genrale.required),
                    check("exam").notEmpty().withMessage(messages.genrale.required),
                    check("exam.degree").notEmpty().withMessage(messages.genrale.required),
                    check("exam.questions").not().isEmpty().withMessage(messages.genrale.required),
                    check("exam.questions[*]question").not().isEmpty().withMessage(messages.genrale.required),
                    check("exam.questions[*]answers").not().isEmpty().withMessage(messages.genrale.required),
                    check("exam.questions[*]correctAnswer").not().isEmpty().withMessage(messages.genrale.required)
                ];
            case "update":
                return [
                    check("name").notEmpty().withMessage(messages.genrale.required),
                    check("description").notEmpty().withMessage(messages.genrale.required),
                    check("video").notEmpty().withMessage(messages.genrale.required)
                ];
            case "updateExams":
                return [
                    check("exam[*]question").not().isEmpty().withMessage(messages.genrale.required),
                    check("exam[*]answer").not().isEmpty().withMessage(messages.genrale.required),
                    check("exam[*]correctAnswer").not().isEmpty().withMessage(messages.genrale.required)
                ]
        }
    }
}