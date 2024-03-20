import type { ActionFunctionArgs, LinksFunction, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { AppError } from "api/shared/errors/appError";
import { parse } from "api/shared/types/typebox.parse";
import { createUser } from "api/user/services.server";
import { createuserBodyValidator, type CreateUserBody } from "api/user/types/createUserBody";
import styles from './create.css';
// import { redirect } from "remix-supertyped";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => {
    return [
        { title: "User" },
        { name: "description", content: "Welcome to User!" },
    ];
};

export async function action({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();

        const input = parse<CreateUserBody>(createuserBodyValidator, {
            name: formData.get("name"),
            lastname: formData.get("lastname"),
            email: formData.get("email"),
            password: formData.get("password"),
            birthdate: formData.get("birthdate"),
            role: formData.get("role"),
        })

        await createUser({
            name: input.name,
            lastname: input.lastname,
            email: input.email,
            password: input.password,
            birthdate: input.birthdate,
            role: input.role,
        });
        
       
        return null;

    } catch (error) {
        if (error instanceof AppError) {
            throw new Response(error.message, { status: error.code });
        } else {
            throw new Response('InternalServerError', { status: 500 })
        }
    }
}

export default function CreateUser() {

    return (
        <Form method="post">
            <label>
                <span>Nombre</span>
                <input
                    name="name"
                    type="text"
                />
            </label>
            <label>
                <span>Apellidos</span>
                <input
                    name="lastname"
                    type="text"
                />
            </label>
            <label>
                <span>Correo</span>
                <input
                    name="email"
                    type="text"
                />
            </label>
            <label>
                <span>Contraseña</span>
                <input
                    name="password"
                    type="password"
                    placeholder="1234 Main St"
                />
            </label>
            <label>
                <span>Fecha de nacimiento</span>
                <input
                    name="birthdate"
                    type="date"
                />
            </label>
            <label >
                <span>Rol</span>
                <select name="role">
                    <option selected>Seleccioné un rol:</option>
                    <option value="Client">Client</option>
                    <option value="Admin">Admin</option>
                </select>
            </label>
            <button type="submit">Registrarte</button>
        </Form>
    );
}