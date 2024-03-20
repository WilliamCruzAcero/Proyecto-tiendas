import { DatabaseUser } from "api/user/model";
import type { User } from "api/user/types/user";

export const search = async ( filter: Partial<User>): Promise<User[]> => {
    const search = await DatabaseUser.findAll({
        where: filter
    })
    return search.map(user => user.toJSON());
}