let router = require("express").Router();
let authTeacherController = require("../../controllers/teacher/auth.teacher.controller");
let catchErrors = require("../../middlewares/catchErrors")

router.post("/login",
    catchErrors(authTeacherController.login)
);

router.post("/register",
    catchErrors(authTeacherController.register)
);

module.exports = router;