let router = require("express").Router();
let unitExamDegreeStudentController = require("../../controllers/students/unitExamDegree.student.controller");
let unitExamDegreeStudentValidation = require("../../validations/students/unitExamDegree.student.validations");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
let checkValidationErrors = require("../../middlewares/checkValidationErrors");
router.get("/:courseId/units",
    guards.isStudent,
    catchErrors(unitExamDegreeStudentController.index)
);

router.get("/:courseId/units/:unitId",
    guards.isStudent,
    catchErrors(unitExamDegreeStudentController.show)
);

router.post("/:courseId/units",
    guards.isStudent,
    unitExamDegreeStudentValidation.validate("create"),
    checkValidationErrors,
    catchErrors(unitExamDegreeStudentController.store)
);

module.exports = router;