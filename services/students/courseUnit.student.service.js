let { Unit } = require("../../models");

exports.getUnit = async query => await Unit.findOne(query);