let { Grade } = require("../../models");

exports.getAllGrade = async () => await Grade.find();