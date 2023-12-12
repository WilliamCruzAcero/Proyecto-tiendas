import { BadRequestError } from "api/shared/errors/babRequest";
import type { User } from "./types/user";
import { create, search } from "./repository";

export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {

    const [existUser] = await search({
        email: data.email
    });
    
    if (existUser) throw new BadRequestError(`El correo ${data.email}, ya está registrado`);

    return create({
        ...data
    });
};