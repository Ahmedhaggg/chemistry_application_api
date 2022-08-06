let router = require("express").Router();
let unitRevisionStudentController = require("../../controllers/students/unitRevision.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");

router.get("/:unitId/revisions",
    guards.isStudent,
    catchErrors(unitRevisionStudentController.index)
);

router.get("/:unitId/revisions/:revisionId",
    guards.isStudent,
    catchErrors(unitRevisionStudentController.show)
);

module.exports = router;