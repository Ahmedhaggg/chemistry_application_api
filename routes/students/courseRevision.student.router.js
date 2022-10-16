let router = require("express").Router();
let courseRevisionStudentController = require("../../controllers/students/courseRevision.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
let courseGuards = require("../../middlewares/coursesGuards");

router.get("/:courseId/revisions",
    guards.isStudent,
    courseGuards.isStudentCourse,
    catchErrors(courseRevisionStudentController.index)
);

router.get("/:courseId/revisions/:revisionId",
    guards.isStudent,
    catchErrors(courseRevisionStudentController.show)
);

module.exports = router;