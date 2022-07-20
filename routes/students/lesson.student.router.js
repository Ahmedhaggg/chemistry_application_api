let router = require("express").Router();
let lessonStudentController = require("../../controllers/students/lesson.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
let courseGuards = require("../../middlewares/coursesGuards");

router.get("/:courseId/units/:unitId/lessons/:lessonId",
    guards.isStudent,
    courseGuards.isStudentCourse,
    catchErrors(lessonStudentController.show)
);

module.exports = router;