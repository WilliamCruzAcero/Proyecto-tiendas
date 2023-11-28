import type { ErrorCode } from "../types/errorCode";

export class AppError extends Error {
    constructor(
        public message: string,
        public code: ErrorCode
    ) {
        super(message)
    }
}