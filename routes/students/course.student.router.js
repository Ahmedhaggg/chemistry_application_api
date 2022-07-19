let router = require("express").Router();
let courseStudentController = require("../../controllers/students/course.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
let courseGuards = require("../../middlewares/coursesGuards");

router.get("/:courseId",
    guards.isStudent,
    courseGuards.isStudentCourse,
    catchErrors(courseStudentController.show)
);

module.exports = router;
