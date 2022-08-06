let router = require("express").Router();
let courseUnitStudentController = require("../../controllers/students/courseUnit.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
let courseGuards = require("../../middlewares/coursesGuards");

router.get("/:courseId/units/:unitId",
    guards.isStudent,
    catchErrors(courseUnitStudentController.show)
);

module.exports = router;