let mongoose = require("mongoose");
let courseService = require("../services/teacher/course.teacher.service")
mongoose
    .connect("mongodb+srv://AhmedHaggag:AhmedHaggagRady@cluster0.u5klm.mongodb.net/chemistryApplication?retryWrites=true&w=majority")
    .then(async () => {
        console.log("mongoose connect")
    })
    .catch((err) => {
        console.log(
            'MongoDB connection error. Please make sure MongoDB is running. ' + err
        )
        process.exit(1)
    })
