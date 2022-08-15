let router = require("express").Router();
let catchErrors = require("../../middlewares/catchErrors")
let courseUnitTeacherController = require("../../controllers/teacher/courseUnit.teacher.controller");
let guards = require("../../middlewares/guards");
let courseUnitTeacherValidation = require("../../validations/teacher/courseUnit.teacher.valiation");
let checkValidationErrors = require("../../middlewares/checkValidationErrors");

router.get("/:courseId/units",
    guards.isTeacher,
    catchErrors(courseUnitTeacherController.index)
);

router.post("/:courseId/units",
    guards.isTeacher,
    courseUnitTeacherValidation.validate("create"),
    checkValidationErrors,
    catchErrors(courseUnitTeacherController.store)
);

router.get("/:courseId/units/next-arrangement",
    guards.isTeacher,
    catchErrors(courseUnitTeacherController.showNextUnitArrangement)
);

router.get("/:courseId/units/:unitId",
    guards.isTeacher,
    catchErrors(courseUnitTeacherController.show)
);

router.put("/:courseId/units/:unitId",
    guards.isTeacher,
    courseUnitTeacherValidation.validate("update"),
    checkValidationErrors,
    catchErrors(courseUnitTeacherController.update)
);

module.exports = router;