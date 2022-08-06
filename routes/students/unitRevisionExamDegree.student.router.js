let router = require("express").Router();
let unitRevisionExamDegreeStudentController = require("../../controllers/students/unitRevisionExamDegree.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");

router.get("/:unitId/revisions",
    guards.isStudent,
    catchErrors(unitRevisionExamDegreeStudentController.index)
);

router.get("/:unitId/revisions/:revisionId",
    guards.isStudent,
    catchErrors(unitRevisionExamDegreeStudentController.show)
);

router.post("/:unitId/revisions/:revisionId",
    guards.isStudent,
    catchErrors(unitRevisionExamDegreeStudentController.store)
);

module.exports = router;