class AppError extends Error {
    constructor() {
        super();
    }

    create(statusText, statusCode, message) {
        this.statusText = statusText;
        this.statusCode = statusCode;
        this.message = message;
        return this;
    }
}

export default new AppError();