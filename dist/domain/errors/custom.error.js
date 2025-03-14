"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
    static notFound(message) {
        return new CustomError('Not found error: ' + message);
    }
    static internalServer(message) {
        return new CustomError('Internal error: ' + message);
    }
    static sequelizeError(message) {
        return new CustomError('Sequelize error detected: ' + message);
    }
    static throwAnError(error) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw this.internalServer(error.message);
    }
}
exports.CustomError = CustomError;
