let router = require("express").Router();
let studentExamDegreeController = require("../../controllers/teacher/studentExamDegree.teacher.controller")
let guards = require("../../middlewares/guards");
const catchErrors = require("../../middlewares/catchErrors");

router.get("/:studentId/exams-degrees", 
    guards.isTeacher,
    catchErrors(studentExamDegreeController.index)
);

router.get("/:studentId/units/:unitId/exams-degrees", 
    guards.isTeacher,
    catchErrors(studentExamDegreeController.showUnitDegree)
);

module.exports = router;