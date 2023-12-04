import { redirect, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import ProductCard, { links as ProductLinks } from "~/components/productCard/product";
import styles from '../styles/store/store.css';
import { getUserId } from "~/utils/session.server";
import { getDetailedStore } from "api/store/services.server";
import { Link, useLoaderData } from "@remix-run/react";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    ...ProductLinks()
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    // Protected route
    const userId = await getUserId(request);
    if (!userId) {
        const current = new URL(request.url);
        const searchParams = new URLSearchParams([["redirectTo", current.pathname + current.search]]);
        throw redirect(`/login?${searchParams}`);
    }
    // Protected route
    const store = await getDetailedStore(userId)

    if (!store) return redirect('create')

    return { store }
};

export default function Index() {
    const { store } = useLoaderData<typeof loader>();
    return (
        <>
            {store.DatabaseProducts.map(product =>
                <ProductCard
                    key={product.id}
                    product={product}
                >
                </ProductCard>
            )}
            <Link className="add-product" to={`product/create`}>
                Add
            </Link >
        </>
    );
}