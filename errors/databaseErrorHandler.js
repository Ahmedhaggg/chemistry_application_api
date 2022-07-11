let status = require("./status");
let APIError = require("./api.error");
let messages = require("../helpers/messages");

exports.handleInsertErrors = error => {
    console.log(error)
    if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });

        throw new APIError(status.CLIENT_ERROR, {
            errorName: "validationError",
            errors
        });
    } else if (error.index === 0) {
        let errors = {};
        Object.keys(error.keyPattern).forEach(key => {
            errors[key] = messages.genrale.unique
        });
        throw new APIError(status.INTERNAL_SERVER_ERROR, {
            errorName: "validationError",
            errors
        });
    } else {
        throw new APIError(status.INTERNAL_SERVER_ERROR, {
            errorName: "serverError",
            message: messages.serverError
        });
    }
}