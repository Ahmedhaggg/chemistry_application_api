let teacherService = require("../../services/teacher/index.teacher.service")
let messages = require("../../helpers/messages");
const { compare } = require("../../helpers/hash");
let roles = require("../../helpers/roles");

exports.showLogin = async (req, res, next) => {
    let loginError = req.flash("loginError");
    console.log(loginError)
    res.render("login", {
        layout: false,
        loginError
    })
}

exports.login = async (req, res, next) => {
    console.log(req.body)
    let { email, password } = req.body;

    let teacher = await teacherService.getTeacherLoginData({ email });

    if (!teacher) {
        req.flash("loginError", {
            message: messages.login.faild.email
        })
        return res.redirect("/teacher/login");
    }

    let isTruePassword = await compare(password, teacher.password);

    if (isTruePassword === false) {
        req.flash("loginError", {
            message: messages.login.faild.password
        })
        return res.redirect("/teacher/login");
    }

    req.session.user = {
        role: roles.TEACHER
    }

    res.redirect("/teacher/dashboard")
}