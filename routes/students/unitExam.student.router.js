let router = require("express").Router();
let unitExamStudentController = require("../../controllers/students/unitExam.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
let courseGuards = require("../../middlewares/coursesGuards");

router.get("/:unitId",
    guards.isStudent,
    catchErrors(unitExamStudentController.show)
);


module.exports = router;