let router = require("express").Router();
let courseRevisionExamDegreeStudentValidation = require("../../validations/students/courseRevisionExamDegree.student.validation");
let courseRevisionExamDegreeStudentController = require("../../controllers/students/courseRevisionExamDegree.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
const checkValidationErrors = require("../../middlewares/checkValidationErrors");

router.get("/:courseId/revisions",
    guards.isStudent,
    catchErrors(courseRevisionExamDegreeStudentController.index)
);

router.get("/:courseId/revisions/:revisionId",
    guards.isStudent,
    catchErrors(courseRevisionExamDegreeStudentController.show)
);

router.post("/:courseId/revisions",
    guards.isStudent,
    courseRevisionExamDegreeStudentValidation.validate("create"),
    checkValidationErrors,
    catchErrors(courseRevisionExamDegreeStudentController.store)
);

module.exports = router;