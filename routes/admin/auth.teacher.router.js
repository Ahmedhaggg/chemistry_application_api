let router = require("express").Router();
let authAdminController = require("../../controllers/admin/auth.teacher.controller");
let guards = require("../../middlewares/guards");
let teacherCatchErrors = require("../../middlewares/teacherCatchErrors");

router.get("/login",
    teacherCatchErrors(authAdminController.showLogin, "loginError")
)
router.post("/login",
    guards.isAdmin,
    teacherCatchErrors(authAdminController.login, "loginError")
)

module.exports = router;