let { Student } = require("../../models");


exports.createStudent = async studentData => {
    let newStudent = new Student();
    newStudent.firstName = studentData.firstName;
    newStudent.lastName = studentData.lastName;
    newStudent.email = studentData.email;
    newStudent.password = studentData.password;
    newStudent.phoneNumber = studentData.phoneNumber;
    return await newStudent.save();
}

exports.getUserLoginData = async email => await Student
    .findOne({ email })
    .select("email accepted password")


exports.deleteStudent = async studentId => {
    let deletedStudent = await Student.deleteOne({ _id: studentId });
    console.log(deletedStudent);

}

exports.getStudent = async studentId => {
    let student = await Student.findOne({ _id: studentId })
    return student;
}