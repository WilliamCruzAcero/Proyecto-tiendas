import { type Static, Type} from "@sinclair/typebox";
import { validatorFactory } from "api/shared/types/typebox.parse";

export const LoginBodyModel = Type.Object({
    email: Type.String({ minLength: 1 }),
    password: Type.String({ minLength: 1 }),
    remenber: Type.Optional(Type.Union([ Type.Literal('Y'), Type.Literal('N') ])) 
});

export type LoginBody = Static<typeof LoginBodyModel>;
export const loginBodyValidator = validatorFactory(LoginBodyModel)