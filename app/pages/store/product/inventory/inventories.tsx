import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getDetailedProduct } from "api/product/services.server";
import { AppError } from "api/shared/errors/appError";
import styles from './inventories.css'
import InventoryCard, { links as InventortLinks } from "~/components/invetoryCard/inventory";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    ...InventortLinks()
];

export async function loader({ params }: LoaderFunctionArgs) {
    try {
        const storeId = parseInt(params.storeId as string);
        const productId = parseInt(params.productId as string);

        const productDetailed = await getDetailedProduct(productId);

        return { productDetailed, storeId};

    } catch (error: any) {
        if (error instanceof AppError
        ) {
            throw new Response(error.message, { status: error.code });
        } else {
            throw new Response('InternalServerError', { status: 500 })
        }
    }
}

export default function Inventories() {
    const { productDetailed, storeId } = useLoaderData<typeof loader>();
    return (
        <div className="card-inventories">
            <h3>Inventarios</h3>
            {productDetailed.DatabaseInventories.map(inventory =>
                <InventoryCard
                    key={inventory.id}
                    inventory={inventory}
                ></InventoryCard>
            )}
            <Link className="back-product" to={`/store/${storeId}`}>
                Go Back
            </Link >
            <Link className="add-product" to={`inventory/create`}>
                Add Inventory
            </Link >
        </div>
    )
}