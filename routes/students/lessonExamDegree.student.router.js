let router = require("express").Router();
let lessonExamDegreeStudentController = require("../../controllers/students/lessonExamDegree.student.controller");
let lessonExamDegreeStudentValidation = require("../../validations/students/lessonExamDegree.student.validation")
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
const checkValidationErrors = require("../../middlewares/checkValidationErrors");

router.get("/:unitId/lessons",
    guards.isStudent,
    catchErrors(lessonExamDegreeStudentController.index)
);

router.get("/:unitId/lessons/:lessonId",
    guards.isStudent,
    catchErrors(lessonExamDegreeStudentController.show)
);

router.post("/:unitId/lessons",
    guards.isStudent,
    lessonExamDegreeStudentValidation.validate("create"),
    checkValidationErrors,
    catchErrors(lessonExamDegreeStudentController.store)
);

module.exports = router;