import { type TypedResponse, type ActionFunctionArgs, type LinksFunction, type MetaFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { AppError } from "api/shared/errors/appError";
import { parse, validate } from "api/shared/types/typebox.parse";
import { createUser } from "api/user/services.server";
import { createuserBodyValidator, type CreateUserBody } from "api/user/types/createUserBody";
import style from './create.css';
import type { User } from "api/user/types/user";

export const meta: MetaFunction = () => {
    return [
        { title: "User" },
        { name: "description", content: "Welcome to User!" },
    ];
};

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: style },
];


type ActionResponse = {
    data: User | null;
    formErrors: Partial<CreateUserBody> | null;
    appError: { code: number, message: string } | null
}

export async function action({ request }: ActionFunctionArgs): Promise<ActionResponse | TypedResponse<never>> {

    const formData = await request.formData();

    try {
        const data = {
            name: formData.get("name"),
            lastname: formData.get("lastname"),
            email: formData.get("email"),
            password: formData.get("password"),
            birthdate: formData.get("birthdate"),
            role: formData.get("role"),
        };

        const errors = validate(createuserBodyValidator, data);
        let formDataErros: Partial<CreateUserBody> = {};

        errors.forEach(e => {
            const name = e.instancePath.replace("/", "") as keyof CreateUserBody;
            formDataErros[name] = e.message;
        });

        if (errors.length) {
            return {
                data: null,
                formErrors: formDataErros,
                appError: null
            }
        }

        const input = parse<CreateUserBody>(createuserBodyValidator, data)

        await createUser({
            name: input.name,
            lastname: input.lastname,
            email: input.email,
            password: input.password,
            birthdate: input.birthdate,
            role: input.role,
        });

        return redirect('/login')

    } catch (error: any) {
        if (error instanceof AppError) {
            return {
                appError: {
                    code: error.code,
                    message: error.message,
                },
                formErrors: null,
                data: null
            }
        } else {
            throw new Response('InternalServerError', { status: 500 })
        }
    }
}

export default function CreateUser() {
    const resp = useActionData<typeof action>();

    return (
        <div className="user-container">
            <Form method="post">
                <label>
                    <span>Nombre</span>
                    <input
                        name="name"
                        type="text"
                        required
                    />
                    <span className="resp">
                        {resp?.formErrors?.name || ''}
                    </span>
                </label>
                <label>
                    <span>Apellidos</span>
                    <input
                        name="lastname"
                        type="text"
                        required
                    />
                    <span className="resp">
                        {resp?.formErrors?.lastname || ''}
                    </span>
                </label>
                <label>
                    <span>Correo</span>
                    <input
                        name="email"
                        type="text"
                        required
                    />
                    <span className="resp">
                        {resp?.appError?.message}
                        {resp?.formErrors?.email || ''}
                    </span>
                </label>
                <label>
                    <span>Contraseña</span>
                    <input
                        name="password"
                        type="password"
                        placeholder="Ejemplo: 123456"
                        required
                    />
                    <span className="resp">
                        {resp?.formErrors?.password || ''}
                    </span>
                </label>
                <label>
                    <span>Fecha de nacimiento</span>
                    <input
                        name="birthdate"
                        type="date"
                        required
                    />
                    <span className="resp">
                        {resp?.formErrors?.birthdate || ''}
                    </span>
                </label>
                <label >
                    <span>Rol</span>
                    <select name="role">
                        <option value="Client">Client</option>
                        <option value="Admin">Admin</option>
                    </select>
                </label>
                <button className="register" type="submit">Registrarse</button>
            </Form>
        </div>
    );
}