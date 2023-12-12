import { type Static, Type } from "@sinclair/typebox";
import { validatorFactory } from "api/shared/types/typebox.parse";

export const createuserBodyModel = Type.Object({
    name: Type.String({ minLength: 1 }),
    lastname: Type.String({ minLength: 1 }),
    email: Type.String({ minLength: 1 }),
    password: Type.String({ minLength: 1 }),
    birthdate: Type.String({ minLength: 1 }),
    active: Type.Optional(Type.String())
})

export type CreateUserBody = Static<typeof createuserBodyModel>;
export const createuserBodyValidator = validatorFactory(createuserBodyModel); 