
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createProduct } from "api/product/services.server";
import { createproductBodyValidator, type CreateProductBody } from "api/product/types/createProduct.body";
import { AppError } from "api/shared/errors/appError";
import { parse } from "api/shared/types/typebox.parse";
import { stringToNumber } from "api/shared/utils/stringToNumber";

export async function action({ request, params }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();       
        
        const input = parse<CreateProductBody>(createproductBodyValidator, {
            store: params.storeId,
            name: formData.get("name"),
            image: formData.get("image")
        })
         
        await createProduct({
            name: input.name,
            image: input.image,
            store: stringToNumber(input.store, 'Tienda')
        });

        return redirect(`/store/${input.store}`);
    
    } catch (error: any) {
        if (error instanceof AppError) {
            throw new Response(error.message, { status: error.code });
        } else {
            throw new Response('InternalServerError', { status: 500 })
        }
    }
}

export default function CreateProduct() {

    return (
        <Form method="post">
            <label>
                <span>Name</span>
                <input
                    name="name"
                    type="text"
                />
            </label>
            <label>
                <span>Image</span>
                <input
                    name="image"
                    type="url"
                />
            </label>
            
            <button type="submit">Create</button>

        </Form>
    );
}