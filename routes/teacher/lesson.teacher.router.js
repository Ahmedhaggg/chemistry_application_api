let router = require("express").Router();
let catchErrors = require("../../middlewares/catchErrors")
let lessonTeacherController = require("../../controllers/teacher/lesson.teacher.controller");
let guards = require("../../middlewares/guards");
let lessonTeacherValidation = require("../../validations/teacher/lesson.teacher.validation");
let checkValidationErrors = require("../../middlewares/checkValidationErrors");


router.get("/:unitId/lessons/next-arrangement",
    guards.isTeacher,
    catchErrors(lessonTeacherController.showNextLessontArrangement)
);

router.get("/:unitId/lessons/:lessonId",
    guards.isTeacher,
    catchErrors(lessonTeacherController.show)
);

router.post("/:unitId/lessons",
    guards.isTeacher,
    lessonTeacherValidation.validate("create"),
    checkValidationErrors,
    catchErrors(lessonTeacherController.store)
);

router.put("/:unitId/lessons/:lessonId",
    guards.isTeacher,
    lessonTeacherValidation.validate("update"),
    checkValidationErrors,
    catchErrors(lessonTeacherController.update)
)

router.delete("/:unitId/lessons/:lessonId",
    guards.isTeacher,
    catchErrors(lessonTeacherController.destroy)
);

module.exports = router;