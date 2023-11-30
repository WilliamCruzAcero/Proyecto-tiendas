import { AppError } from "./appError";

export class UnauthorizedError extends AppError {
    constructor(
        public message: string
    ){
        super(message, 401 )
    }
}