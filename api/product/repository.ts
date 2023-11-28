import { DatabaseInventory } from "../inventory/model";
import { NotFoundError } from "../shered/errors/notFound";
import { DatabaseProduct } from "./model";
import type { Product } from "./types/product";

export const getById = async ( id: string ): Promise<Product | null> => {
    const product = await DatabaseProduct.findByPk(id);
    return product ? product.toJSON() : null;
};

export const getDetailProduct =async (id: number): Promise<Product | null > => {
    const product = await DatabaseProduct.findByPk(id, {
        include: [
            {
                model: DatabaseInventory,
            }
        ]
    });

    return product? product.toJSON(): null;
};

export const search =async ( filter: Partial<Omit<Product, 'id'>> ): Promise<Product[]> => {
    const search = await DatabaseProduct.findAll({
        where: filter
    })
    return search.map(product => product.toJSON());
}

export const create = async ( data: Omit<Product, 'id'>): Promise<Product> => {

    const product = await DatabaseProduct.create({
        ...data,
        active: data.active || true
    })
    
    return product.toJSON();
}

export const update = async ( data: Partial<Omit<Product, 'id'>> & Pick<Product, 'id'> ): Promise<Product> => {

    const update: Partial<Product> = {};
    
    if (data.name) update.name = data.name;
    if (data.image) update.image = data.image;
    if (data.store) update.store = data.store;
    if (data.active) {
        update.active = true
    } else (update.active = false)
    
    let product = await DatabaseProduct.findByPk(data.id)
    if( !product ) throw new NotFoundError('Producto')

    if (!Object.keys(update).length) return product.toJSON();

    product = await product.update(update);

    return product.toJSON()
}

