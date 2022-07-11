let router = require("express").Router();
let GradeStudentController = require("../../controllers/students/grade.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");

router.get("/",
    catchErrors(GradeStudentController.index)
);

module.exports = router;