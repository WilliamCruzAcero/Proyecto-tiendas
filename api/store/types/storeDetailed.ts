import { Type, type Static } from '@sinclair/typebox';
import { validatorFactory } from "../../shared/types/typebox.parse";
import { productDetailedModel } from 'api/product/types/productDetailed';
import { storeModel } from './store';

export const storeDetailedModel = Type.Intersect([
    storeModel,
    Type.Object({
        DatabaseProducts: Type.Array(productDetailedModel)
    })
]);

export type StoreDetailed = Static<typeof storeDetailedModel>;
export const storeDetailedValidator = validatorFactory(storeDetailedModel);