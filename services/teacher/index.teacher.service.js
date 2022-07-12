let { Teacher } = require("../../models");
let { handleInsertErrors } = require("../../errors/databaseErrorHandler")
exports.createTeacher = async newTeacherData => {
    try {
        let newTeacher = new Teacher();
        newTeacher.email = newTeacherData.email;
        newTeacher.password = newTeacherData.password;

        return await (await newTeacher.save());
    } catch (error) {
        handleInsertErrors(error);
    }
}

exports.getTeacherLoginData = async query => await Teacher.findOne(query).select("_id password");




