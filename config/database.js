let mongoose = require("mongoose");
let { DB_URL_CON } = require("../config/index")
mongoose
    .connect("mongodb://127.0.0.1:27017/chemistry_application")
    .then(async () => {
        console.log("mongoose connect")
    })
    .catch((err) => {
        console.log(
            'MongoDB connection error. Please make sure MongoDB is running. ' + err
        )
        process.exit(1)
    })
