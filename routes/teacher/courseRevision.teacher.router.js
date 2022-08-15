let router = require("express").Router();
let catchErrors = require("../../middlewares/catchErrors")
let courseRevisionTeacherController = require("../../controllers/teacher/courseRevision.teacher.controller");
let guards = require("../../middlewares/guards");
let courseRevisionTeacherValidation = require("../../validations/teacher/courseRevision.teacher.validation");
let checkValidationErrors = require("../../middlewares/checkValidationErrors");

router.get("/:courseId/revisions",
    guards.isTeacher,
    catchErrors(courseRevisionTeacherController.index)
);

router.post("/:courseId/revisions",
    guards.isTeacher,
    courseRevisionTeacherValidation.validate("create"),
    checkValidationErrors,
    catchErrors(courseRevisionTeacherController.store)
);

router.get("/:courseId/revisions/next-arrangement",
    guards.isTeacher,
    catchErrors(courseRevisionTeacherController.showNextRevisionArrangement)
)

router.get("/:courseId/revisions/:revisionId",
    guards.isTeacher,
    catchErrors(courseRevisionTeacherController.show)
);

router.put("/:courseId/revisions/:revisionId",
    guards.isTeacher,
    courseRevisionTeacherValidation.validate("update"),
    checkValidationErrors,
    catchErrors(courseRevisionTeacherController.update)
);

router.delete("/:courseId/revisions/:revisionId",
    guards.isTeacher,
    catchErrors(courseRevisionTeacherController.destroy)
);

module.exports = router;