import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { validatorFactory } from "../../shared/types/typebox.parse";
import { inventoryModel } from 'api/inventory/types/inventory';
import { productModel } from './product';

export const productDetailedModel = Type.Intersect([
    productModel,
    Type.Object({
        DatabaseInventories: Type.Array(inventoryModel)
    })
]);

export type ProductDetailed = Static<typeof productDetailedModel>;
export const productDetailedValidator = validatorFactory(productDetailedModel);