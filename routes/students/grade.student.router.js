let router = require("express").Router();
let GradeStudentController = require("../../controllers/students/grade.student.controller");

router.get("/", GradeStudentController.index);

module.exports = router;