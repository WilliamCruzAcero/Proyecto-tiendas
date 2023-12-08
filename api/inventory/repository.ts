import { NotFoundError } from "api/shared/errors/notFound";
import { DatabaseInventory } from "./model";
import type { Inventory } from "./types/inventory";

export const getById = async (id: number): Promise<Inventory | null> => {
    
    const store = await DatabaseInventory.findByPk(id)
    return store ? store.toJSON() : null;
};

export const search =async ( filter: Partial<Omit<DatabaseInventory, 'id'>> ): Promise<DatabaseInventory[]> => {
    const search = await DatabaseInventory.findAll({
        where: filter
    })
    return search.map(inventory => inventory.toJSON());
}

export const create = async (data: Omit<Inventory, 'id'>): Promise<Inventory> => {
    
    const inventory = await DatabaseInventory.create({
        ...data,
        active: data.active || true
    })

    return inventory.toJSON();
};

export const update = async ( data: Partial<Omit<Inventory, 'id'>> & Pick<Inventory, 'id'>): Promise<Inventory> => {

    const update: Partial<Inventory> = {};
    
    if (data.store) update.store = data.store;
    if (data.product) update.product = data.product;
    if (data.price) update.price = data.price;
    if (data.stock) update.stock = data.stock;
    if (data.active) {
        update.active = true
    } else (update.active = false)
    
    let inventory = await DatabaseInventory.findByPk(data.id)
    if( !inventory ) throw new NotFoundError(`No existe un inventario con el id ${data.id}`)

    if (!Object.keys(update).length) return inventory.toJSON();

    inventory = await inventory.update(update);

    return inventory.toJSON()
}