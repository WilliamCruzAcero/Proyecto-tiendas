import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shared/types/typebox.parse';
import { inventoryModel } from './inventory';

export const createInventoryBodyModel = Type.Omit(inventoryModel, ['id']);
export type CreateInventoryBody = Static<typeof createInventoryBodyModel>;
export const createInventoryBodyValidator = validatorFactory(createInventoryBodyModel);