import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getDetailedProduct } from "api/product/services.server";
import { AppError } from "api/shared/errors/appError";
import ProductCard, { links as ProductLinks } from "~/components/productCard/product";
import styles from './inventories.css';
import { links as InventoryLinks } from "~/components/invetoryCard/inventory";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    ...ProductLinks(),
    ...InventoryLinks()
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
            throw new Response('InternalServerError', { status: 500 })
        }
    }
}

export default function Index() {
    const { productDetailed } = useLoaderData<typeof loader>();

    return (
        <div className="product-detail">
            <div className="card-container">
                <ProductCard
                    product={productDetailed}
                    useLink={false}
                ></ProductCard>
            </div>
            <div className="create-inventory">
                <Outlet />
            </div>
        </div>
    );
}