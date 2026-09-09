export interface BaseService {}

export class ServiceError extends Error {
    constructor(
        message: string,
        public code: string,
        public statusCode: number = 500,
        public originalError?: Error
    ) {
        super(message);
        this.name = "ServiceError";
    }
};

export type ServiceResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: ServiceError;
};
