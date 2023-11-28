import { AppError } from "./appError";

export class NotFoundError extends AppError {
    constructor(
        public message: string
    ){
        super(message, 404 )
    }
}