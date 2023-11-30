import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shared/types/typebox.parse';
import { productModel } from './product';

export const updateProductBodyModel = Type.Partial(Type.Omit(productModel, ['id']));
export type UpdateProductBody = Static<typeof updateProductBodyModel>;
export const updateProductBodyValidator = validatorFactory(updateProductBodyModel);