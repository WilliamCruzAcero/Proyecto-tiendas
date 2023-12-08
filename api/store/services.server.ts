import { create, getById, getDetailStore, search, update } from "./repository";
import { BadRequestError } from "../shared/errors/babRequest";
import type { Store } from "./types/store";
import { type Product } from "api/product/types/product";

export const getStoreById = async (id: number) => {
    return getById(id);
}

export const getDetailedStore = async (id: number) => {
    const store = await getDetailStore(id);

    if (!store) return null;

    return {
        ...store,
        DatabaseProducts: store.DatabaseProducts.map( p => {
            const product: Product & { hasStock: 'Y' | 'N' } = {
                id: p.id,
                image: p.image,
                store: p.store,
                name: p.name,
                active: p.active || false,
                hasStock: p.DatabaseInventories.some( i => i.stock > 0 ) ? 'Y' : 'N'
            }

            return product;
        })
    }
};

export const createStore = async (data: Store): Promise<Store> => {

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