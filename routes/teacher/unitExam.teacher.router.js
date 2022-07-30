let router = require("express").Router();
let catchErrors = require("../../middlewares/catchErrors")
let unitExamTeacherController = require("../../controllers/teacher/unitExam.teacher.controller");
let guards = require("../../middlewares/guards");
let unitExamTeacherValidation = require("../../validations/teacher/unitExam.teacher.validation");
let checkValidationErrors = require("../../middlewares/checkValidationErrors");

router.post("/:unitId/exam",
    guards.isTeacher,
    unitExamTeacherValidation.validate("create"),
    checkValidationErrors,
    catchErrors(unitExamTeacherController.store)
);

module.exports = router;