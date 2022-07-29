const express = require("express");
const cors = require("cors");


const messages = require("./helpers/messages")

let app = express()

// user parse md
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// use cors policy
app.use(cors())

// require db
require("./config/database")

// student routes 
let authStudentRoutes = require("./routes/students/auth.student.router");
let gradeStudentRoutes = require("./routes/students/grade.student.router");
let courseStudentRoutes = require("./routes/students/course.student.router");
let profileStudentRoutes = require("./routes/students/profile.student.router");
let courseUnitStudentRoutes = require("./routes/students/courseUnit.student.router");
let lessonStudentRoutes = require("./routes/students/lesson.student.router");

app.use("/students/auth", authStudentRoutes);
app.use("/students/grades", gradeStudentRoutes);
app.use("/students/courses", courseStudentRoutes);
app.use("/students/profile", profileStudentRoutes);
app.use("/students/courses", courseUnitStudentRoutes)
app.use("/students/courses", lessonStudentRoutes)


// teacher routes
let authTeacherRoutes = require("./routes/teacher/auth.teacher.router");
let courseTeacherRoutes = require("./routes/teacher/course.teacher.router");
let gradeTeacherRoutes = require("./routes/teacher/grade.teacher.router");
let courseUnitTeacherRoutes = require("./routes/teacher/courseUnit.teacher.router");
let lessonTeacherRoutes = require("./routes/teacher/lesson.teacher.router");
let UnitExamTeacherRoutes = require("./routes/teacher/unitExam.teacher.router")

app.use("/teacher/auth", authTeacherRoutes);
app.use("/teacher/courses", courseTeacherRoutes);
app.use("/teacher/grades", gradeTeacherRoutes);
app.use("/teacher/courses", courseUnitTeacherRoutes);
app.use("/teacher/units", lessonTeacherRoutes);
app.use("/teacher/units", UnitExamTeacherRoutes)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.httpStatusCode || 500).json({
        success: false,
        error: err.description || messages.serverError
    });
})



app.listen(5000, () => console.log("server is running"))