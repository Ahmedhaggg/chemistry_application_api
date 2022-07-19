let router = require("express").Router();
let indexStudentController = require("../../controllers/students/profile.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");

router.get("/",
    guards.isStudent,
    catchErrors(indexStudentController.show)
)

module.exports = router;