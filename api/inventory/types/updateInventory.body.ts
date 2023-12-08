import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shared/types/typebox.parse';


export const updateInventoryBodyModel = Type.Object({
    id: Type.String(),
    store: Type.String(),
    product: Type.String(),
    price: Type.String({ minLength: 1 }),
    stock: Type.String({ minLength: 1 }),
    expiration: Type.String({ minLength: 1 }),
    active: Type.Optional(Type.String())
});
export type UpdateInventoryBody = Static<typeof updateInventoryBodyModel>;
export const updateinventoryBodyValidator = validatorFactory(updateInventoryBodyModel);