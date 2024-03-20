import { AppError } from "../errors/appError";
import { BadRequestError } from "../errors/babRequest";


export const stringToNumber = (data: string, name: string) => {
    try {
        const number = parseInt(data);
    
        if (isNaN(number)) {
            throw new BadRequestError(`${name} no es un número`)
        }
    
        return number;
    } catch (error: any) {
        if (error instanceof AppError) {
            throw new Response(error.message, { status: error.code });
        } else {
            throw new Response('InternalServerError', { status: 500 })
        }
    }
}