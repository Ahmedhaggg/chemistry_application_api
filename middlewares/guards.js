const roles = require("../helpers/roles");
let APIError = require("../errors/api.error");
let messages = require("../helpers/messages");
let status = require("../errors/status");

exports.isStudent = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        let tokenData = await getDataFromJwtToken(token);

        if (tokenData.role !== roles.STUDENT)
            throw new APIError(status.UNAUTHORIZED, {
                errorName: "authorizedError",
                message: messages.unauthorized
            });

        req.student = {
            id: tokenData.id,
            role: tokenData.role
        };

        next();
    } catch (error) {

        throw new APIError(status.INTERNAL_SERVER_ERROR, {
            errorName: "serverError",
            message: messages.serverError
        });
    }
}

exports.isTeacher = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        let tokenData = await getDataFromJwtToken(token);

        if (tokenData.role !== roles.TEACHER)
            throw new APIError(status.UNAUTHORIZED, {
                errorName: "authorizedError",
                message: messages.unauthorized
            });

        next();
    } catch (error) {

        throw new APIError(status.INTERNAL_SERVER_ERROR, {
            errorName: "serverError",
            message: messages.serverError
        });
    }
}