let mongoose = require("mongoose");
let { DB_URL_CON } = require("../config/index")
mongoose
    .connect(DB_URL_CON)
    .then(async () => {
        console.log("mongoose connect")
    })
    .catch((err) => {
        console.log(
            'MongoDB connection error. Please make sure MongoDB is running. ' + err
        )
        process.exit(1)
    })
