export class CustomError extends Error {
    constructor(
        public readonly message: string
    ) {
        super(message);
    }

    static notFound(message: string) {
        return new CustomError('Not found error: ' + message)
    }

    static internalServer(message: string) {
        return new CustomError('Internal error: ' + message)
    }

    static sequelizeError(message: string) {
        return new CustomError('Sequelize error detected: ' + message)
    }

    static throwAnError(error: any): void {
        console.log(error);
        
        if (error instanceof CustomError) {
            throw error;
        }
        throw this.internalServer(error.message);
    }
}