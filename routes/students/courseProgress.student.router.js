let router = require("express").Router();
let courseProgressController = require("../../controllers/students/courseProgress.student.controller");
let courseProgressValidation = require("../../validations/students/courseProgress.student.validation");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");
const checkValidationErrors = require("../../middlewares/checkValidationErrors");

router.put("/units",
    guards.isStudent,
    courseProgressValidation.validate("updateUnitProgress"),
    checkValidationErrors,
    catchErrors(courseProgressController.updateCourseUnitProgress),
);

router.put("/lessons",
    guards.isStudent,
    courseProgressValidation.validate("updateLessonProgress"),
    checkValidationErrors,
    catchErrors(courseProgressController.updateUnitLessonProgress),
);

router.put("/units/revisions",
    guards.isStudent,
    courseProgressValidation.validate("updateUnitRevisionProgress"),
    checkValidationErrors,
    catchErrors(courseProgressController.updateUnitRevisionProgress),
);

router.put("/revisions",
    guards.isStudent,
    courseProgressValidation.validate("updateCourseRevisionProgress"),
    checkValidationErrors,
    catchErrors(courseProgressController.updateCourseRevisionProgress),
);

module.exports = router;