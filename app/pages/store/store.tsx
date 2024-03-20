import { redirect, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getStoreById } from "api/store/services.server";
import { getUserId } from "~/utils/session.server";
import styles from './store.css';
import HeaderCard from "~/components/header/headerCard";

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
        <>
            <HeaderCard
                store={store}
            >
            </HeaderCard>
            <div className="contentproduct">
                <Outlet />
            </div>
        </>
    ); 
}