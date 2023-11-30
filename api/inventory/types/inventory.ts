import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from "../../shared/types/typebox.parse";

export const inventoryModel = Type.Object({
    id: Type.Number(),
    store: Type.Number(),
    product: Type.Number({ minLength: 1 }),
    price: Type.Number(),
    stock: Type.Number(),
    expiration: Type.Optional(Type.String({ minLength: 1 })),
    active: Type.Optional(Type.Boolean())
});

export type Inventory = Static<typeof inventoryModel>;
export const inventoryValidator = validatorFactory(inventoryModel);