let router = require("express").Router();
let catchErrors = require("../../middlewares/catchErrors")
let gradeTeacherController = require("../../controllers/teacher/grade.teacher.controller");
let guards = require("../../middlewares/guards");
let gradeTeacherValidation = require("../../validations/teacher/grade.teacher.valiation");
let checkValidationErrors = require("../../middlewares/checkValidationErrors");

router.get("/",
    guards.isTeacher,
    catchErrors(gradeTeacherController.index)
);

router.post("/",
    guards.isTeacher,
    gradeTeacherValidation.validate("create"),
    checkValidationErrors,
    catchErrors(gradeTeacherController.store)
);

router.get("/:gradeId",
    guards.isTeacher,
    catchErrors(gradeTeacherController.show)
);

router.put("/:gradeId",
    guards.isTeacher,
    gradeTeacherValidation.validate("update"),
    checkValidationErrors,
    catchErrors(gradeTeacherController.update)
);


module.exports = router;