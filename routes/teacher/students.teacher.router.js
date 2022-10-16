let router = require("express").Router();
let catchErrors = require("../../middlewares/catchErrors")
let studentTeacherController = require("../../controllers/teacher/student.teacher.controller");
let guards = require("../../middlewares/guards");
// let studentTeacherValidation = require("../../validations/teacher/student.teacher.validation");
let checkValidationErrors = require("../../middlewares/checkValidationErrors");

router.get("/count",
    guards.isTeacher,
    catchErrors(studentTeacherController.count)
);

router.get('/',
    guards.isTeacher,
    catchErrors(studentTeacherController.index)
);

router.get("/:studentId",
    guards.isTeacher,
    catchErrors(studentTeacherController.show)
);


// router.delete("/:studentId",
//     guards.isTeacher,
//     catchErrors(studentTeacherController.destroy)
// );

module.exports = router;