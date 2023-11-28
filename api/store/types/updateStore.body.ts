import { Static, Type } from '@sinclair/typebox';
import { validatorFactory } from '../../shered/types/typebox.parse';
import { storeModel } from './store';


export const updateStoreBodyModel = Type.Partial(Type.Omit(storeModel, ['id']));
export type UpdateStoreBody = Static<typeof updateStoreBodyModel>;
export const updateStoreBodyValidator = validatorFactory(updateStoreBodyModel);