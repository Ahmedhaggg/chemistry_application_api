let router = require("express").Router();
let unitExamDegreeStudentController = require("../../controllers/students/unitExamDegree.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");

router.get("/:courseId/units",
    guards.isStudent,
    catchErrors(unitExamDegreeStudentController.index)
);

router.get("/:courseId/units/:unitId",
    guards.isStudent,
    catchErrors(unitExamDegreeStudentController.show)
);

router.post("/:courseId/units/:unitId",
    guards.isStudent,
    catchErrors(unitExamDegreeStudentController.store)
);

module.exports = router;