let router = require("express").Router();
let unitExamStudentController = require("../../controllers/students/unitExam.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
let courseGuards = require("../../middlewares/coursesGuards");

router.get("/:courseId/units/:unitId",
    guards.isStudent,
    courseGuards.isStudentCourse,
    catchErrors(unitExamStudentController.show)
);


module.exports = router;