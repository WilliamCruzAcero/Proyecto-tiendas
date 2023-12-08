import { create, getDetailProduct, search, update } from "./repository";
import { BadRequestError } from "../shared/errors/babRequest";
import { NotFoundError } from "../shared/errors/notFound";
import type { Product } from "./types/product";

export const getProduct = async (id: number): Promise<Product & { hasStock: 'Y' | 'N' }> => {
    const product = await getDetailProduct(id);

    if (!product) throw new NotFoundError(`No existe un producto asignado al id: ${id}`);

    return {
        id: product.id,
        image: product.image,
        store: product.store,
        name: product.name,
        active: product.active || false,
        hasStock: product.DatabaseInventories.some(i => i.stock > 0) ? 'Y' : 'N'
    }
};

export const getDetailedProduct = async (id: number) => {
    const product = await getDetailProduct(id);
    if (!product) throw new NotFoundError(`No existe un producto asignado al id: ${id}`);
    return product
};

export const createProduct = async (data: Omit<Product, 'id'>): Promise<Product> => {

    const [existproduct] = await search({
        name: data.name,
        store: data.store
    });

    if (existproduct) throw new BadRequestError(`Ya existe un producto ${data.name} para esta tienda`);

    return create({
        ...data
    });
};

export const updateProduct = async (data: Partial<Omit<Product, 'id'>> & Pick<Product, 'id'>): Promise<Product> => {
    return update(data);
};

export const deleteProduct = async (id: Product["id"]): Promise<Product> => {
    return update({
        id,
        active: false
    });
};