class CustomError extends Error {
    public status: string | number;

    constructor(message: string, statusCode: string | number) {
        super(message);
        this.name = this.constructor.name;
        this.status = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
