import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shared/types/typebox.parse';

export const createProductBodyModel = Type.Object({    
    name: Type.String({ minLength: 1 }),
    image: Type.String({ format: 'uri' }),
    store: Type.String({ minLength: 1 }),
    active: Type.Optional(Type.String())
})
export type CreateProductBody = Static<typeof createProductBodyModel>;
export const createproductBodyValidator = validatorFactory(createProductBodyModel);