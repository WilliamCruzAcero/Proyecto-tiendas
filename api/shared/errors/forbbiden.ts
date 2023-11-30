import { AppError } from "./appError";

export class ForbiddenError extends AppError {
    constructor(
        public message: string
    ){
        super(message, 403 )
    }
}