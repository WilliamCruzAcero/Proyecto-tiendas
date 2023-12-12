import { redirect, type LinksFunction, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import ProductCard, { links as ProductLinks } from "~/components/productCard/product";
import styles from './index.css';
import { getUserId } from "~/utils/session.server";
import { getDetailedStore } from "api/store/services.server";
import { Link, useLoaderData } from "@remix-run/react";
import { AppError } from "api/shared/errors/appError";

export const meta: MetaFunction = () => {
    return [
        { title: "Store" },
        { name: "description", content: "Welcome to Store!" },
    ];
};

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    ...ProductLinks()
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    try {
        // Protected route
        const userId = await getUserId(request);
        if (!userId) {
            const current = new URL(request.url);
            const searchParams = new URLSearchParams([["redirectTo", current.pathname + current.search]]);
            throw redirect(`/login?${searchParams}`);
        }

        // Protected route
        const storeDetailed = await getDetailedStore(userId)
        if (!storeDetailed) return redirect('create')
        return { storeDetailed }

    } catch (error: any) {
        if (error instanceof AppError
        ) {
            throw new Response(error.message, { status: error.code });
        } else {
            console.error(error)
            throw new Response('InternalServerError', { status: 500 })
        }
    }
};

export default function Index() {
    const { storeDetailed } = useLoaderData<typeof loader>();
    return (
        <>
            {storeDetailed.DatabaseProducts.map(product =>
                <ProductCard
                    key={product.id}
                    product={product}
                >
                </ProductCard>
            )}
            <Link className="add-product" to={`product/create`}>
                Add Product
            </Link >
        </>
    );
}