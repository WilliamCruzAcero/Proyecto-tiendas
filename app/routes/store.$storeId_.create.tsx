import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { AppError } from "api/shared/errors/appError";
import { parse } from "api/shared/types/typebox.parse";
import { stringToNumber } from "api/shared/utils/stringToNumber";
import { createStore } from "api/store/services.server";
import type { CreateStoreBody } from "api/store/types/createStore.body";
import { createstoreBodyValidator } from "api/store/types/createStore.body";

export async function action({ request, params }: ActionFunctionArgs) {
    try {
        
        const formData = await request.formData();       
        
        const input = parse<CreateStoreBody>(createstoreBodyValidator, {
            id: params.storeId,
            logo: formData.get("logo"),
            name: formData.get("name"),
            nit: formData.get("nit"),
            address: formData.get("address"),
            phone: formData.get("phone")
        })
        
        await createStore({
            id: stringToNumber(input.id, 'id'),
            logo: input.logo,
            name: input.name,
            nit: input.nit,
            address: input.address,
            phone: stringToNumber(input.phone, 'Teléfono'),
        });

        return redirect(`/store/${input.id}`);
    
    } catch (error: any) {
        if (error instanceof AppError) {
            throw new Response(error.message, { status: error.code });
        } else {
            throw new Response('InternalServerError', { status: 500 })
        }
    }
}

export default function CreateStore() {
    
    return (
        <Form method="post">
            <label>
                <span>Logo</span>
                <input
                    name="logo"
                    type="text"
                />
            </label>
            <label>
                <span>Name</span>
                <input
                    name="name"
                    type="text"
                />
            </label>
            <label>
                <span>Nit</span>
                <input
                    name="nit"
                    type="text"
                />
            </label>
            <label>
                <span>Address</span>
                <input
                    name="address"
                    type="text"
                    placeholder="1234 Main St"
                />
            </label>
            <label>
                <span>Phone</span>
                <input
                    name="phone"
                    type="phone"
                />
            </label>
            <button type="submit">Create</button>
            
        </Form>
    );
}