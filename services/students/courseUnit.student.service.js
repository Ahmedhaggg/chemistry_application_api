let { Unit } = require("../../models");

exports.getUnit = async query => await Unit.findOne(query);

exports.getExam = async query => await Unit.findOne(query).select("exam");