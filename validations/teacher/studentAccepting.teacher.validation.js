let messages = require("../../helpers/messages");
let { check, body } = require("express-validator");

module.exports = {
    validate: action => {
        switch (action) {
            case "accept":
                return [
                    check("courseId").notEmpty().withMessage(messages.genrale.required),
                    check("nextUnit._id")
                        .if(body("nextUnit").notEmpty()).notEmpty().withMessage(messages.genrale.required),
                    check("nextUnit.arrangement")
                        .if(body("nextUnit").notEmpty()).notEmpty().withMessage(messages.genrale.required),
                    check("nextLesson._id")
                        .if(body("nextLesson").notEmpty()).notEmpty().withMessage(messages.genrale.required),
                    check("nextLesson.arrangement")
                        .if(body("nextLesson").notEmpty()).notEmpty().withMessage(messages.genrale.required),
                    check("nextUnitRevision._id")
                        .if(body("nextUnitRevision").notEmpty()).notEmpty().withMessage(messages.genrale.required),
                    check("nextUnitRevision.arrangement")
                        .if(body("nextUnitRevision").notEmpty()).notEmpty().withMessage(messages.genrale.required),
                    check("nextRevision._id")
                        .if(body("nextRevision").notEmpty()).notEmpty().withMessage(messages.genrale.required),
                    check("nextRevision.arrangement")
                        .if(body("nextRevision").notEmpty()).notEmpty().withMessage(messages.genrale.required),
                    // check("nextRevisionId").notEmpty().withMessage(messages.genrale.required),
                    // check("nextUnitRevisionId").notEmpty().withMessage(messages.genrale.required)
                ];

        }
    }
}