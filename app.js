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


app.listen(5000, () => console.log("server is running"))