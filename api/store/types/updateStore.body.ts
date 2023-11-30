import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shared/types/typebox.parse';

export const updateStoreBodyModel = Type.Object({
    id: Type.String(),
    logo: Type.Optional(Type.String({ format: 'uri' })),
    name: Type.Optional(Type.String({ minLength: 1 })),
    nit: Type.Optional(Type.String()),
    address: Type.Optional(Type.String()),
    phone: Type.Optional(Type.String()),
    active: Type.Optional(Type.String())
});

export type UpdateStoreBody = Static<typeof updateStoreBodyModel>;
export const updateStoreBodyValidator = validatorFactory(updateStoreBodyModel);