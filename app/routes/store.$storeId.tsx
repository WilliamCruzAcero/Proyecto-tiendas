import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getStoreById } from "api/store/services.server";
import { getUserId } from "~/utils/session.server";
import styles from '../components/store/store.css';

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles }
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
    const store = await getStoreById(userId)

    if (!store) return redirect('create')

    return { store }
};

export default function Index() {
    const { store } = useLoaderData<typeof loader>();
    return (
        <div className="content">
            <div className="store">
                <img src={store.logo} alt="" />
                <div className="info">
                    <h2>{store.name}</h2>
                    <p><span>Nit: </span>{store.nit}</p>
                    <p><span>Dirección: </span>{store.address}</p>
                </div>
            </div>
            <div className="contentproduct">
                <Outlet />
            </div>
        </div>
    );
}