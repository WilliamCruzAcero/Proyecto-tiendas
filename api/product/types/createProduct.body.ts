import { Static, Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shered/types/typebox.parse';
import { productModel } from './product';

export const createProductBodyModel = Type.Omit(productModel, ['id']);
export type CreateProductBody = Static<typeof createProductBodyModel>;
export const createProductBodyValidator = validatorFactory(createProductBodyModel);