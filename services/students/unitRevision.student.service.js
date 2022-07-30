let { Revision, Unit } = require("../../models");

exports.getUnitRevisons = async query => await Unit.findOne(query).select("revisions");

exports.getUnitRevision = async query => await Revision.findOne(query);
