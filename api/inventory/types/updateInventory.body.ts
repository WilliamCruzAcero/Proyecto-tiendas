import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shered/types/typebox.parse';
import { inventoryModel } from './inventory';

export const updateInventoryBodyModel = Type.Partial(Type.Omit(inventoryModel, ['id']));
export type UpdateInventoryBody = Static<typeof updateInventoryBodyModel>;
export const updatenventoryBodyValidator = validatorFactory(updateInventoryBodyModel);