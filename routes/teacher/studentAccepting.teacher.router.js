let router = require("express").Router();
let catchErrors = require("../../middlewares/catchErrors")
let studentAcceptingTeacherController = require("../../controllers/teacher/studentAccepting.teacher.controller");
let guards = require("../../middlewares/guards");
let studentAcceptingTeacherValidation = require("../../validations/teacher/studentAccepting.teacher.validation");
let checkValidationErrors = require("../../middlewares/checkValidationErrors");

router.get("/un-accepted/count",
    guards.isTeacher,
    catchErrors(studentAcceptingTeacherController.count)
);

router.get('/un-accepted',
    guards.isTeacher,
    catchErrors(studentAcceptingTeacherController.index)
);

router.get("/:studentId/un-accepted",
    guards.isTeacher,
    catchErrors(studentAcceptingTeacherController.show)
);

router.put("/:studentId/un-accepted",
    guards.isTeacher,
    studentAcceptingTeacherValidation.validate("accept"),
    checkValidationErrors,
    catchErrors(studentAcceptingTeacherController.update)
);

router.delete("/:studentId/un-accepted",
    guards.isTeacher,
    catchErrors(studentAcceptingTeacherController.destroy)
);

module.exports = router;