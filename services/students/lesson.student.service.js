let { Lesson } = require("../../models");

exports.getLesson = async query => await Lesson.findOne(query);
