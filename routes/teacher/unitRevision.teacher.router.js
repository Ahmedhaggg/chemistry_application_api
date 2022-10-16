let router = require("express").Router();
let catchErrors = require("../../middlewares/catchErrors")
let unitRevisionTeacherController = require("../../controllers/teacher/unitRevision.teacher.controller");
let guards = require("../../middlewares/guards");
let unitRevisionTeacherValidation = require("../../validations/teacher/unitRevision.teacher.validation");
let checkValidationErrors = require("../../middlewares/checkValidationErrors");

router.get("/:unitId/revisions/next-arrangement",
    guards.isTeacher,
    catchErrors(unitRevisionTeacherController.showNextUnitRevisionArrangement)
);

router.get("/:unitId/revisions",
    guards.isTeacher,
    catchErrors(unitRevisionTeacherController.index)
);

router.post("/:unitId/revisions",
    guards.isTeacher,
    unitRevisionTeacherValidation.validate("create"),
    checkValidationErrors,
    catchErrors(unitRevisionTeacherController.store)
);

router.get("/:unitId/revisions/:revisionId",
    guards.isTeacher,
    catchErrors(unitRevisionTeacherController.show)
);

router.put("/:unitId/revisions/:revisionId",
    guards.isTeacher,
    unitRevisionTeacherValidation.validate("update"),
    checkValidationErrors,
    catchErrors(unitRevisionTeacherController.update)
);

router.delete("/:unitId/revisions/:revisionId",
    guards.isTeacher,
    catchErrors(unitRevisionTeacherController.destroy)
);

module.exports = router;