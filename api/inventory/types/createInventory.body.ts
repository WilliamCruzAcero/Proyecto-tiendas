import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shared/types/typebox.parse';

export const createInventoryBodyModel = Type.Object({
    store: Type.String(),
    product: Type.String(),
    price: Type.String({ minLength: 1 }),
    stock: Type.String({ minLength: 1 }), 
    expiration:Type.String({ minLength: 1 }),
    active: Type.Optional(Type.String())
});
export type CreateInventoryBody = Static<typeof createInventoryBodyModel>;
export const createInventoryBodyValidator = validatorFactory(createInventoryBodyModel);