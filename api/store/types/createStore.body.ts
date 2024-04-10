import { Type, type Static } from '@sinclair/typebox';
import { validatorFactory } from '../../shared/types/typebox.parse';

export const createStoreBodyModel = Type.Object({
    id: Type.String(), 
    logo: Type.String({ format: 'uri' }),
    name: Type.String({ minLength: 1 }),
    nit: Type.String({ minLength: 1 }),
    address: Type.String({ minLength: 1 }),
    phone: Type.String({ minLength: 1 }),
    active: Type.Optional( Type.String() )
});

export type CreateStoreBody = Static<typeof createStoreBodyModel>;
export const createstoreBodyValidator = validatorFactory(createStoreBodyModel);