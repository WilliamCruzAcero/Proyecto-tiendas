import { type Static, Type } from "@sinclair/typebox";
import { validatorFactory } from "api/shared/types/typebox.parse";

export const userModel = Type.Object({
    id: Type.Number({minimum: 1}), 
    name: Type.String({ minLength: 1 }),
    lastname: Type.String({ minLength: 1 }),
    email: Type.String({ minLength: 1 }),
    password: Type.String({ minLength: 1 }),
    birthdate: Type.String({ minLength: 1 }),
    active: Type.Optional( Type.Boolean() )
})

export type User = Static<typeof userModel>;
export const userValidator = validatorFactory(userModel); 