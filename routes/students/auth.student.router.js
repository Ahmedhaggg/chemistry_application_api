let router = require("express").Router();
let authStudentController = require("../../controllers/students/auth.student.controller");
let catchErrors = require("../../middlewares/catchErrors");

router.post("/login",
    catchErrors(authStudentController.login)
);

router.post("/register",
    catchErrors(authStudentController.register)
);

router.get("/accepted/:studentId",
    catchErrors(authStudentController.getAcceptedResult)
);

module.exports = router;