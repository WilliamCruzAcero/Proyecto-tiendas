import { redirect, type ActionFunctionArgs, type LinksFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createInventory } from "api/inventory/services.server";
import { createInventoryBodyValidator, type CreateInventoryBody } from "api/inventory/types/createInventory.body";
import { AppError } from "api/shared/errors/appError";
import { parse } from "api/shared/types/typebox.parse";
import styles from './create.css';
import { stringToNumber } from "api/shared/utils/stringToNumber";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles }
];

export async function action({ request, params }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();

        const input = parse<CreateInventoryBody>(createInventoryBodyValidator, {
            store: params.storeId,
            product: params.productId,
            price: formData.get("price"),
            stock: formData.get("stock"),
            expiration: formData.get("expiration")
        })
        
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
                </label>
                <label>
                    <span>Stock</span>
                    <input
                        placeholder='0'
                        name="stock"
                        type="number"
                    />
                </label>
                <label>
                    <span>Vence</span>
                    <input
                        name="expiration"
                        type="date"
                    />
                </label>
                <button type="submit">Create</button>
            </Form>
        </>
    );
} 