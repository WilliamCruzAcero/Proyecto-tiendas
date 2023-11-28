import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from "../../shered/types/typebox.parse";

export const storeModel = Type.Object({
    id: Type.Number(), 
    logo: Type.String({ format: 'uri' }),
    name: Type.String({ minLength: 1 }),
    nit: Type.String(),
    address: Type.String(),
    phone: Type.Number(),
    active: Type.Optional( Type.Boolean() )
});

export type Store = Static<typeof storeModel>;
export const storeValidator = validatorFactory(storeModel);