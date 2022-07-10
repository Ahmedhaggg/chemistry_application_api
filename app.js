const express = require("express");
const cors = require("cors");

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

app.use("/students", authStudentRoutes)
app.use("/students/grades", gradeStudentRoutes)



app.listen(5000, () => console.log("server is running"))