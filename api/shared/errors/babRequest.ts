import { AppError } from "./appError";

export class BadRequestError extends AppError {
    constructor(
        public message: string
    ){
        super(message, 400 )
    }
}