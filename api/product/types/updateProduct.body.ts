import { Static, Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shered/types/typebox.parse';
import { productModel } from './product';

export const updateProductBodyModel = Type.Partial(Type.Omit(productModel, ['id']));
export type UpdateProductBody = Static<typeof updateProductBodyModel>;
export const updateProductBodyValidator = validatorFactory(updateProductBodyModel);