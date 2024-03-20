import { redirect, type LinksFunction, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import ProductCard, { links as ProductLinks } from "~/components/productCard/product";
import styles from './index.css';
import { getUserId } from "~/utils/session.server";
import { getDetailedStore } from "api/store/services.server";
import { Link, useLoaderData } from "@remix-run/react";
import { AppError } from "api/shared/errors/appError";
import { getUserById } from "api/user/services.server";

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
    // Protected route
    const userId = await getUserId(request);
    if (!userId) {
        const current = new URL(request.url);
        const searchParams = new URLSearchParams([["redirectTo", current.pathname + current.search]]);
        throw redirect(`/login?${searchParams}`);
    }
    
    try {
        // Protected route
        const storeDetailed = await getDetailedStore(userId)
        if (!storeDetailed) return redirect('create')
        
        const user = await getUserById(userId)
        
        return { storeDetailed, user }

    } catch (error: any) {
        if (error instanceof AppError
        ) {
            throw new Response(error.message, { status: error.code });
        } else {
            throw new Response('InternalServerError', { status: 500 })
        }
    }
};

export default function Index() {
    const { storeDetailed, user } = useLoaderData<typeof loader>();
    return (
        <>
            <h1 className="greeting">
                Bienvenido {user?.name} { user?.lastname}
            </h1>
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