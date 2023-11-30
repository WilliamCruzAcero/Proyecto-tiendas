import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getDetailedProduct } from "api/product/services.server";
import { AppError } from "api/shared/errors/appError";

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
        <p>{productDetailed.name}</p>
    );
}