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
let courseRevisionStudentRoutes = require("./routes/students/courseRevision.student.router")
let profileStudentRoutes = require("./routes/students/profile.student.router");
let courseProgressStudentRoutes = require("./routes/students/courseProgress.student.router")
let courseUnitStudentRoutes = require("./routes/students/courseUnit.student.router");
let lessonStudentRoutes = require("./routes/students/lesson.student.router");
let unitExamStudentRoutes = require("./routes/students/unitExam.student.router");
let unitRevisionStudentRoutes = require("./routes/students/unitRevision.student.router");// stop
let courseRevisionExamDegreeStudentRoutes = require("./routes/students/courseRevisionExamDegree.student.router");
let unitExamDegreeStudentRoutes = require("./routes/students/unitExamDegree.student.router");
let lessonExamDegreeStudentRoutes = require("./routes/students/lessonExamDegree.student.router");
let unitRevisionExamDegreeStudentroutes = require("./routes/students/unitRevisionExamDegree.student.router");


app.use("/students/auth", authStudentRoutes);
app.use("/students/grades", gradeStudentRoutes);
app.use("/students/courses", courseStudentRoutes);
app.use("/students/profile", profileStudentRoutes);
app.use("/students/courses", courseUnitStudentRoutes);
app.use("/students/courses", courseRevisionStudentRoutes);
app.use("/students/course-progress", courseProgressStudentRoutes);
app.use("/students/units", lessonStudentRoutes);
app.use("/students/units", unitRevisionStudentRoutes);
app.use("/students/units", unitExamStudentRoutes);
// degrees
app.use("/students/exams-degrees/courses", courseRevisionExamDegreeStudentRoutes);
app.use("/students/exams-degrees/courses", unitExamDegreeStudentRoutes);
app.use("/students/exams-degrees/units", lessonExamDegreeStudentRoutes);
app.use("/students/exams-degrees/units", unitRevisionExamDegreeStudentroutes);


// teacher routes
let authTeacherRoutes = require("./routes/teacher/auth.teacher.router");
let courseTeacherRoutes = require("./routes/teacher/course.teacher.router");
let gradeTeacherRoutes = require("./routes/teacher/grade.teacher.router");
let courseUnitTeacherRoutes = require("./routes/teacher/courseUnit.teacher.router");
let lessonTeacherRoutes = require("./routes/teacher/lesson.teacher.router");
let UnitExamTeacherRoutes = require("./routes/teacher/unitExam.teacher.router")
let unitRevisionTeacherRoutes = require("./routes/teacher/unitRevision.teacher.router");
let courseRevisionTeacherRoutes = require("./routes/teacher/courseRevision.teacher.router");
let studentAcceptingTeacherRoutes = require("./routes/teacher/studentAccepting.teacher.router");
let studentTeacherRoutes = require("./routes/teacher/students.teacher.router");


app.use("/teacher/auth", authTeacherRoutes);
app.use("/teacher/courses", courseTeacherRoutes);
app.use("/teacher/grades", gradeTeacherRoutes);
app.use("/teacher/courses", courseUnitTeacherRoutes);
app.use("/teacher/units", lessonTeacherRoutes);
app.use("/teacher/units", UnitExamTeacherRoutes);
app.use("/teacher/units", unitRevisionTeacherRoutes);
app.use("/teacher/courses", courseRevisionTeacherRoutes);
app.use("/teacher/students", studentAcceptingTeacherRoutes);
app.use("/teacher/students", studentTeacherRoutes);

app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.body)
    res.status(404).json({
        success: false,
        message: "not found"
    })
});

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.httpStatusCode || 500).json({
        success: false,
        error: err.description || messages.serverError
    });
})

app.listen(5000, () => console.log("server is running"))