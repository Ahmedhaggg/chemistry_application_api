let router = require("express").Router();
let unitRevisionExamDegreeStudentController = require("../../controllers/students/unitRevisionExamDegree.student.controller");
let unitRevisionExamDegreeStudentValidation = require("../../validations/students/unitRevisionExamDegree.student.validation");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
const checkValidationErrors = require("../../middlewares/checkValidationErrors")
router.get("/:unitId/revisions",
    guards.isStudent,
    catchErrors(unitRevisionExamDegreeStudentController.index)
);

router.get("/:unitId/revisions/:revisionId",
    guards.isStudent,
    catchErrors(unitRevisionExamDegreeStudentController.show)
);

router.post("/:unitId/revisions",
    guards.isStudent,
    unitRevisionExamDegreeStudentValidation.validate("create"),
    checkValidationErrors,
    catchErrors(unitRevisionExamDegreeStudentController.store)
);

module.exports = router;