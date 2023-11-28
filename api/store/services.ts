import { create, getDetailStore, search, update } from "./repository";
import { BadRequestError } from "../shered/errors/babRequest";
import { NotFoundError } from "../shered/errors/notFound";
import type { Store } from "./types/store";

export const getDetailedStore = async (id: number) => {

    const store = await getDetailStore(id);
    if (!store) throw new NotFoundError(`No hay una tienda asignada para el id: ${id}`);

    return store
};

export const createStore = async (data: Omit<Store, 'id'>): Promise<Store> => {

    const [existStore] = await search({
        name: data.name
    });

    if (existStore) throw new BadRequestError(`Ya existe una tienda con el nombre ${data.name}`);

    return create({
        ...data
    });
};

export const updateStore = async (data: Partial<Omit<Store, 'id'>> & Pick<Store, 'id'>): Promise<Store> => {
    return update(data);
};

export const deleteStore = async (id: Store["id"]): Promise<Store> => {
    return update({
        id,
        active: false
    });
};