let router = require("express").Router();
let unitRevisionStudentController = require("../../controllers/students/unitRevision.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
let courseGuards = require("../../middlewares/coursesGuards");

router.get("/:courseId/units/:unitId/revisions",
    guards.isStudent,
    courseGuards.isStudentCourse,
    catchErrors(unitRevisionStudentController.index)
);

router.get("/:courseId/units/:unitId/revisions/:revisionId",
    guards.isStudent,
    courseGuards.isStudentCourse,
    catchErrors(unitRevisionStudentController.show)
);

module.exports = router;