class AppError extends Error{
    constructor(status,message) {
        console.log(message)
        super(message);
        this.statusCode = status;
        this.isOperational = true;
    }
}

module.exports = AppError