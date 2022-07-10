class BaseError extends Error {
    constructor(httpStatusCode, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype)
        this.httpStatusCode = httpStatusCode;
        this.description = description;

        Error.captureStackTrace(this);
    }
}

module.exports = BaseError