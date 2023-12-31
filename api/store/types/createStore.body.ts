import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shared/types/typebox.parse';

export const createStoreBodyModel = Type.Object({
    id: Type.String(), 
    logo: Type.String({ format: 'uri' }),
    name: Type.String({ minLength: 1 }),
    nit: Type.String(),
    address: Type.String(),
    phone: Type.String(),
    active: Type.Optional( Type.String() )
});

export type CreateStoreBody = Static<typeof createStoreBodyModel>;
export const createstoreBodyValidator = validatorFactory(createStoreBodyModel);