import { AppError } from "./appError";

export class InternalServerError extends AppError {
    constructor(
        public message: string
    ){
        super(message, 500 )
    }
}