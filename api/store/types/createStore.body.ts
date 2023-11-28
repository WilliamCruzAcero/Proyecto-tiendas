import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shered/types/typebox.parse';
import { storeModel } from './store';

export const createStoreBodyModel = Type.Omit(storeModel, ['id']);
export type CreateStoreBody = Static<typeof createStoreBodyModel>;
export const createstoreBodyValidator = validatorFactory(createStoreBodyModel);