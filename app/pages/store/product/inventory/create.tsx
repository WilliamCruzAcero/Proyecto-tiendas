import { redirect, type ActionFunctionArgs, type LinksFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createInventory } from "api/inventory/services.server";
import { createinventoryBodyValidator, type CreateinventoryBody } from "api/inventory/types/createInventory.body";
import { AppError } from "api/shared/errors/appError";
import { parse, validate } from "api/shared/types/typebox.parse";
import styles from './create.css';
import { stringToNumber } from "api/shared/utils/stringToNumber";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles }
];

export async function action({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();
    
    try {
        const data = {
            store: params.storeId,
            product: params.productId,
            price: formData.get("price"),
            stock: formData.get("stock"),
            expiration: formData.get("expiration")
        }

        const errors = validate(createinventoryBodyValidator, data);
        let formDataErros: Partial<CreateinventoryBody> = {};

        errors.forEach(e => {
            const name = e.instancePath.replace("/", "") as keyof CreateinventoryBody;
            formDataErros[name] = e.message;
        });

        if (errors.length) {
            return {
                data: null,
                errors: formDataErros
            }
        }

        const input = parse<CreateinventoryBody>(createinventoryBodyValidator, data)

        await createInventory({
            store: stringToNumber(input.store, 'Tienda'),
            product: stringToNumber(input.product, 'Producto'),
            price: stringToNumber(input.price, 'Precio'),
            stock: stringToNumber(input.stock, 'Store'),
            expiration: input.expiration,
        });

        return redirect(`/store/${input.store}/product/${input.product}`);

    } catch (error: any) {
        if (error instanceof AppError) {
            throw new Response(error.message, { status: error.code });
        } else {
            throw new Response('InternalServerError', { status: 500 })
        }
    }
}


export default function CreateInventory() {
    const resp = useActionData<typeof action>();
    
    return (
        <>
            <Form method="post">
                <label>
                    <span>Precio</span>
                    <input
                        placeholder="0"
                        name="price"
                        type="number"
                    />
                    <span>
                        {resp?.errors?.price || ''}
                    </span>
                </label>
                <label>
                    <span>Stock</span>
                    <input
                        placeholder='0'
                        name="stock"
                        type="number"
                    />
                    <span>
                        {resp?.errors?.stock || ''}
                    </span>
                </label>
                <label>
                    <span>Vence</span>
                    <input
                        name="expiration"
                        type="date"
                    />
                    <span>
                        {resp?.errors?.expiration || ''}
                    </span>
                </label>
                <button type="submit">Create</button>
            </Form>
        </>
    );
} 