let mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://AhmedHaggag:AhmedHaggagRady@cluster0.u5klm.mongodb.net/chemistryApplication?retryWrites=true&w=majority")
    .then(() => {
        console.log("mongoose is connecting")
    })
    .catch((err) => {
        console.log(
            'MongoDB connection error. Please make sure MongoDB is running. ' + err
        )
        process.exit(1)
    })
