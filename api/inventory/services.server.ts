import { create, getById, search, update } from "./repository";
import { BadRequestError } from "../shared/errors/babRequest";
import type { Inventory } from "./types/inventory";
import { NotFoundError } from "api/shared/errors/notFound";

export const getInventoryById = async (id: Inventory['id']) => {

    const inventory = await getById(id)

    if (!inventory) throw new NotFoundError(`No hay un producto asignado  para el id: ${id}`);

    return inventory
};

export const createInventory = async (data: Omit<Inventory, 'id'>): Promise<Inventory> => {
    
    const [existeInventory] = await search({
        product: data.product,
        store: data.store,
        expiration: data.expiration
    })

    if (existeInventory) throw new BadRequestError(`Ya existe un inventario para ${data.product} con fecha de expiración ${data.expiration}`)

    return create({
        ...data
    });
};

export const updateInventory =async (data: Partial<Omit<Inventory, 'id'>> & Pick<Inventory, 'id'>): Promise<Inventory> => {
    return update(data)
};

export const deleteProduct = async (id: Inventory["id"]): Promise<Inventory> => {
    return update({
        id,
        active: false
    });
};