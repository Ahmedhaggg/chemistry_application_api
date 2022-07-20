let router = require("express").Router();
let profileStudentController = require("../../controllers/students/profile.student.controller");
let catchErrors = require("../../middlewares/catchErrors");
let guards = require("../../middlewares/guards");

router.get("/",
    guards.isStudent,
    catchErrors(profileStudentController.show)
)

module.exports = router;