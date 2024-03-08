import { type ActionFunctionArgs, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getDetailedProduct } from "api/product/services.server";
import { AppError } from "api/shared/errors/appError";
import styles from './inventories.css'
import InventoryCard, { links as InventortLinks } from "~/components/invetoryCard/inventory";
import { parse } from "api/shared/types/typebox.parse";
import { type UpdateInventoryBody, updateinventoryBodyValidator } from "api/inventory/types/updateInventory.body";
import { updateInventory } from "api/inventory/services.server";
import { stringToNumber } from "api/shared/utils/stringToNumber";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    ...InventortLinks()
];

export async function loader({ params }: LoaderFunctionArgs) {
    try {
        const productId = parseInt(params.productId as string);
        const productDetailed = await getDetailedProduct(productId);

        return { productDetailed };

    } catch (error: any) {
        if (error instanceof AppError
        ) {
            throw new Response(error.message, { status: error.code });
        } else {
            console.error(error)
            throw new Response('InternalServerError', { status: 500 })
        }
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();

        const input = parse<UpdateInventoryBody>(updateinventoryBodyValidator, {
            id: formData.get("id"),
            store: params.storeId,
            product: params.productId,
            price: formData.get("price"),
            stock: formData.get("stock"),
            expiration: formData.get("expiration")
        })

        await updateInventory({
            id: stringToNumber(input.id, 'id'),
            store: stringToNumber(input.store, 'Tienda'),
            product: stringToNumber(input.product, 'Producto'),
            price: stringToNumber(input.price, 'Precio'),
            stock: stringToNumber(input.stock, 'Store'),
            expiration: input.expiration
        });

        return null;

    } catch (error: any) {
        if (error instanceof AppError) {
            throw new Response(error.message, { status: error.code });
        } else {
            throw new Response('InternalServerError', { status: 500 })
        }
    }
}

export default function Inventories() {
    const { productDetailed } = useLoaderData<typeof loader>();
    return (
        <div className="card-inventories">
            <h3>Inventarios</h3>
            {productDetailed.DatabaseInventories.map(inventory =>
                <InventoryCard
                    key={inventory.id}
                    inventory={inventory}
                ></InventoryCard>
            )}
            <Link className="add-product" to={`inventory/create`}>
                Add Inventory
            </Link >
        </div>
    )
}