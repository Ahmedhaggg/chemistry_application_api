let { Course } = require("../../models");

exports.getCourse = async query => await Course.findOne(query);
