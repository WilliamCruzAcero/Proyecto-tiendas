import { BadRequestError } from "api/shared/errors/babRequest";
import type { User } from "./types/user";
import { create, getById, search } from "./repository";
import bcrypt from "bcrypt"

export const getUserById = async (id: number)=> {
    return getById(id); 
}

export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
    const saltRounds = 10;
    var isEmailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!data.name) throw new BadRequestError('complete el campo nombre')

    if (!isEmailRegExp.test(data.email)) throw new BadRequestError('El correo debe ser un correo valido');

    const [existUser] = await search({
        email: data.email
    });

    if (existUser) throw new BadRequestError(`El correo ${data.email}, ya está registrado`);

    return create({
        ...data,
        password: await bcrypt.hash(data.password, saltRounds)
    });
};