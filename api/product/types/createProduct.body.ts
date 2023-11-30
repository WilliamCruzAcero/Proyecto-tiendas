import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shared/types/typebox.parse';
import { productModel } from './product';

export const createProductBodyModel = Type.Omit(productModel, ['id']);
export type CreateProductBody = Static<typeof createProductBodyModel>;
export const createProductBodyValidator = validatorFactory(createProductBodyModel);