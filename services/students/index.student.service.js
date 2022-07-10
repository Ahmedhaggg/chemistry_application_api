let { Student } = require("../../models");


exports.createStudent = async studentData => {
    let newStudent = new Student();
    newStudent.name = studentData.name;
    newStudent.email = studentData.email;
    newStudent.password = studentData.password;
    newStudent.phoneNumber = studentData.phoneNumber;
    newStudent.gradeId = studentData.gradeId;
    newStudent.currentCourseId = studentData.currentCourseId;
    return await newStudent.save();
}

exports.getStudentLoginData = async query => await Student
    .findOne(query)
    .select("email accepted password");


// exports.deleteStudent = async studentId => {
//     let deletedStudent = await Student.deleteOne({ _id: studentId });
//     console.log(deletedStudent);

// }

// exports.getStudent = async studentId => {
//     let student = await Student.findOne({ _id: studentId })
//     return student;
// }