import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from "../../shared/types/typebox.parse";

export const inventoryModel = Type.Object({
    id: Type.Number({minimum: 1}),
    store: Type.Number({minimum: 1}),
    product: Type.Number({minimum: 1}),
    price: Type.Number({minimum: 0}),
    stock: Type.Number({minimum: 0}),
    expiration: Type.String({minLength: 1}),
    active: Type.Optional(Type.Boolean())
});

export type Inventory = Static<typeof inventoryModel>;
export const inventoryValidator = validatorFactory(inventoryModel);