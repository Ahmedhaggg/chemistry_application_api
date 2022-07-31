let { Student } = require("../../models");

exports.getAllUnAcceptedStudent = async (limit = 10, offset = 0) =>
    await Student.find({ accepted })
        .limit(limit)
        .skip(offset);


exports.getUnAcceptedStudent = async (query, fields = ["name", 'email', "currentCourse", "phoneNumber", "grade"]) =>
    await Student.findOne({ ...query, accepted: false })
        .select(...fields);


exports.updateStudent = async (query, newData) => {
    let updatedStudent = await Student.updateOne({ ...query, accepted: false }, newData);

    return updatedStudent.modifiedCount === 1 ? true : handleUpdateErrors(updatedStudent);
}

exports.deleteUnAcceptedStudent = async query => {
    let deletedStudent = await Student.deleteOne({ ...query, accepted: false });

    return deletedStudent.deletedCount === 1 ? true : false;
}
