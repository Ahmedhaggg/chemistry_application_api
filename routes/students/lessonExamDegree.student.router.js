let router = require("express").Router();
let lessonExamDegreeStudentController = require("../../controllers/students/lessonExamDegree.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");

router.get("/:unitId/lessons",
    guards.isStudent,
    catchErrors(lessonExamDegreeStudentController.index)
);

router.get("/:unitId/lessons/:lessonId",
    guards.isStudent,
    catchErrors(lessonExamDegreeStudentController.show)
);

router.post("/:unitId/lessons/:lessonId",
    guards.isStudent,
    catchErrors(lessonExamDegreeStudentController.store)
);

module.exports = router;