let { Student } = require("../../models");
const { handleInsertErrors } = require("../../errors/databaseErrorHandler");

exports.createStudent = async studentData => {
    try {
        let newStudent = new Student();
        newStudent.name = studentData.name;
        newStudent.email = studentData.email;
        newStudent.password = studentData.password;
        newStudent.phoneNumber = studentData.phoneNumber;
        newStudent.grade = studentData.grade;
        newStudent.currentCourse = studentData.currentCourse;
        return await (await newStudent.save())._id;
    } catch (error) {
        handleInsertErrors(error);
    }
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