import { BadRequestError } from "../errors/babRequest";


export const stringToNumber = (data: string, name: string) => {
    const number = parseInt(data);

    if (isNaN(number)) {
        throw new BadRequestError(`${name} no es un número`)
    }

    return number;
}