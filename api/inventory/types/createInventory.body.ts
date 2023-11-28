import { Static, Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shered/types/typebox.parse';
import { inventoryModel } from './inventory';

export const createInventoryBodyModel = Type.Omit(inventoryModel, ['id']);
export type CreateInventoryBody = Static<typeof createInventoryBodyModel>;
export const createInventoryBodyValidator = validatorFactory(createInventoryBodyModel);