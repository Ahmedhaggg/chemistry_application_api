let router = require("express").Router();
let catchErrors = require("../../middlewares/catchErrors")
let courseTeacherController = require("../../controllers/teacher/course.teacher.controller");
let guards = require("../../middlewares/guards");
let courseTeacherValidation = require("../../validations/teacher/course.teacher.valiation");
let checkValidationErrors = require("../../middlewares/checkValidationErrors");

router.get("/",
    guards.isTeacher,
    catchErrors(courseTeacherController.index)
);
router.get("/:courseId",
    guards.isTeacher,
    catchErrors(courseTeacherController.show)
);
router.post("/",
    courseTeacherValidation.validate("create"),
    checkValidationErrors,
    guards.isTeacher,
    catchErrors(courseTeacherController.store)
);

router.put("/:courseId",
    courseTeacherValidation.validate("update"),
    checkValidationErrors,
    guards.isTeacher,
    catchErrors(courseTeacherController.update)
);

module.exports = router;