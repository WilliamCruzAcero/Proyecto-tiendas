import { DatabaseUser } from "./model";
import type { User } from "./types/user";

export const search = async (filter: Partial<Omit<User, 'id'>>): Promise<User[]> => {
    const search = await DatabaseUser.findAll({
        where: filter
    })
    return search.map(user => user.toJSON());
}

export const create = async (data: Omit<User, 'id'>): Promise<User> => {

    const user = await DatabaseUser.create({
        ...data,
        active: data.active || true
    })

    return user.toJSON();
}