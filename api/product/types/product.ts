import { Static, Type } from "@sinclair/typebox";
import { validatorFactory } from "../../shered/types/typebox.parse";

export const productModel = Type.Object({
    id: Type.Number(),
    name: Type.String({ minLength: 1 }),
    image: Type.String({ format: 'uri' }),
    store: Type.Number(),
    active: Type.Optional(Type.Boolean())
});

export type Product = Static<typeof productModel>;
export const productValidator = validatorFactory(productModel);