let router = require("express").Router();
let unitExamDegreeStudentController = require("../../controllers/students/unitExamDegree.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
let courseGuards = require("../../middlewares/coursesGuards");

router.get("/:courseId/degrees",
    guards.isStudent,
    courseGuards.isStudentCourse,
    catchErrors(unitExamDegreeStudentController.index)
);

router.get("/:courseId/degrees/units/:unitId",
    guards.isStudent,
    courseGuards.isStudentCourse,
    catchErrors(unitExamDegreeStudentController.showUnitExamDegree)
);

router.get("/:courseId/degrees/lessons/:lessonId",
    guards.isStudent,
    courseGuards.isStudentCourse,
    catchErrors(unitExamDegreeStudentController.showLessonExamDegree)
);

module.exports = router;