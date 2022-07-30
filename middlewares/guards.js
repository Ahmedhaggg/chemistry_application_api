const roles = require("../helpers/roles");
let APIError = require("../errors/api.error");
let messages = require("../helpers/messages");
let status = require("../errors/status");
let jwt = require("../helpers/jwt")
exports.isStudent = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token) {

            let newError = new APIError(status.UNAUTHORIZED, {
                errorName: "authorizedError",
                message: messages.unauthorized
            });

            next(newError);
        }

        let tokenData = await jwt.getDataFromJwtToken(token);

        if (tokenData.role !== roles.STUDENT) {

            let newError = new APIError(status.UNAUTHORIZED, {
                errorName: "authorizedError",
                message: messages.unauthorized
            });
            return next(newError);
        }

        req.student = {
            id: tokenData.id,
            role: tokenData.role,
            currentCourseId: tokenData.currentCourseId
        };

        next();
    } catch (e) {
        let newError = new APIError(status.INTERNAL_SERVER_ERROR, {
            success: false,
            errorName: "serverError",
            message: messages.serverError
        });

        next(newError);
    }
}

exports.isTeacher = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        if (!token) {

            let newError = new APIError(status.UNAUTHORIZED, {
                errorName: "authorizedError",
                message: messages.unauthorized
            });

            next(newError);
        }

        let tokenData = await jwt.getDataFromJwtToken(token);

        if (tokenData.role === roles.TEACHER)
            return next();

        let error = new APIError(status.UNAUTHORIZED, {
            success: false,
            errorName: "authorizedError",
            message: messages.unauthorized
        });

        next(error);

    } catch (error) {

        let newError = new APIError(status.INTERNAL_SERVER_ERROR, {
            success: false,
            errorName: "serverError",
            message: messages.serverError
        });

        next(newError);
    }
}