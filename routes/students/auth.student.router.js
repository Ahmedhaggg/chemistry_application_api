let router = require("express").Router();
let authStudentController = require("../../controllers/students/auth.student.controller");

router.post("/login",
    authStudentController.login
);

router.post("/register",
    authStudentController.register
);

router.get("/accepted",
    authStudentController.getAcceptedResult
);

module.exports = router;