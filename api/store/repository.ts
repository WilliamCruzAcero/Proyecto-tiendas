import { AppError } from 'api/shared/errors/appError';
import { associate } from '../database/associations';
import { DatabaseInventory } from "../inventory/model";
import { DatabaseProduct } from "../product/model";
import { NotFoundError } from "../shared/errors/notFound";
import { DatabaseStore } from "./model";
import type { Store } from "./types/store";
import type { StoreDetailed } from './types/storeDetailed';

export const getById = async (id: number): Promise<Store | null> => {
    const store = await DatabaseStore.findByPk(id)
    return store ? store.toJSON(): null;
}

export const getDetailStore = async (id: number): Promise<StoreDetailed | null> => {
    associate();
    const store = await DatabaseStore.findByPk(id, {
        include: [
            {
                model: DatabaseProduct,
                include: [
                    {
                        model: DatabaseInventory,
                    }
                ]
            }
        ]
    });
    return store ? store.toJSON() as unknown as StoreDetailed : null;
}

export const search = async (filter: Partial<Omit<Store, 'id'>>): Promise<Store[]> => {
    const search = await DatabaseStore.findAll({
        where: filter
    })
    return search.map(store => store.toJSON());
}

export const create = async (data: Store ): Promise<Store> => {

    try {
        const store = await DatabaseStore.create({
            ...data,
            active: data.active || true
        })
        
        return store.toJSON();
    } catch (error: any) {
        if (error instanceof AppError) {
            console.log('REPOSITORY:', error.message)
            throw new Response(error.message, { status: error.code });
        } else {
            throw new Response('InternalServerError', { status: 500 })
        }
    }
}

export const update = async (data: Partial<Omit<Store, 'id'>> & Pick<Store, 'id'>): Promise<Store> => {
    const update: Partial<Store> = {};

    if (data.logo) update.logo = data.logo;
    if (data.address) update.address = data.address;
    if (data.name) update.name = data.name;
    if (data.nit) update.nit = data.nit;
    if (data.phone) update.phone = data.phone;
    if (data.active) {
        update.active = true
    } else (update.active = false)

    let store = await DatabaseStore.findByPk(data.id);
    if (!store) throw new NotFoundError('store');

    if (!Object.keys(update).length) return store.toJSON();

    store = await store.update(update);

    return store.toJSON()
}