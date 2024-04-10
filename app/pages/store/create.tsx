import { type TypedResponse, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { AppError } from "api/shared/errors/appError";
import { parse, validate } from "api/shared/types/typebox.parse";
import { stringToNumber } from "api/shared/utils/stringToNumber";
import { createStore } from "api/store/services.server";
import { createstoreBodyValidator, type CreateStoreBody } from "api/store/types/createStore.body";
import type { Store } from "api/store/types/store";

type ActionResponse = {
    data: Store | null;
    formErrors: Partial<CreateStoreBody> | null;
    appError: { code: number, message: string }  | null
}

export async function action({ request, params }: ActionFunctionArgs): Promise<ActionResponse | TypedResponse<never>> {
    const formData = await request.formData();

    try {

        const data = {
            id: params.storeId,
            logo: formData.get("logo"),
            name: formData.get("name"),
            nit: formData.get("nit"),
            address: formData.get("address"),
            phone: formData.get("phone")
        }

        const errors = validate(createstoreBodyValidator, data);
        let formDataErros: Partial<CreateStoreBody> = {};

        errors.forEach(e => {
            const name = e.instancePath.replace("/", "") as keyof CreateStoreBody;
            formDataErros[name] = e.message;
        });

        if (errors.length) {
            return {
                data: null,
                formErrors: formDataErros,
                appError: null
            }
        }

        const input = parse<CreateStoreBody>(createstoreBodyValidator, data)

        await createStore({
            id: stringToNumber(input.id, 'id'),
            logo: input.logo,
            name: input.name,
            nit: input.nit,
            address: input.address,
            phone: stringToNumber(input.phone, 'Teléfono')
        });

        return redirect(`/store/${input.id}`);
        
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

export default function CreateStore() {
    const resp = useActionData<typeof action>()
    
    return (
        <Form method="post">
            <samp>{resp?.appError?.message || ""}</samp>
            <label>
                <span>Logo</span>
                <input
                    name="logo"
                    type="text"
                />
                <span>
                    {resp?.formErrors?.logo || ''}
                </span>
            </label>
            <label>
                <span>Name</span>
                <input
                    name="name"
                    type="text"
                />
                <span>
                    {resp?.formErrors?.name || ''}
                </span>
            </label>
            <label>
                <span>Nit</span>
                <input
                    name="nit"
                    type="text"
                />
                <span>
                    {resp?.formErrors?.nit || ''}
                </span>
            </label>
            <label>
                <span>Address</span>
                <input
                    name="address"
                    type="text"
                    placeholder="1234 Main St"
                />
                <span>
                    {resp?.formErrors?.address || ''}
                </span>
            </label>
            <label>
                <span>Phone</span>
                <input
                    name="phone"
                    type="phone"
                />
                <span>
                    {resp?.formErrors?.phone || ''}
                </span>
            </label>
            <button type="submit">Create</button>
        </Form>
    );
}


