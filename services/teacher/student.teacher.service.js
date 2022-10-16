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

exports.getAllAcceptingStudents = async (query, { limit = 10, offset = 0 }) => await Student
    .find({ accepted: true, ...query })
    .select("_id name phoneNumber").populate({
        path: "grade",
        select: "_id name"
    })
    .limit(limit)
    .skip(offset);

exports.getStudent = async query => await Student.findOne(query)
    .select("_id name email phoneNumber")
    .populate({
        path: "grade",
        select: "name"
    })
    .populate({
        path: "currentCourse",
        select: "name"
    });


exports.countAcceptingStudents = async (query = {}) => await Student.countDocuments({ ...query, accepted: true });