let { Grade } = require("../../models");

exports.getAllGrades = async () => await Grade.find().select("_id name currentCourseId");