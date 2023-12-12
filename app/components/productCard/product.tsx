import type { LinksFunction } from "@remix-run/node";
import style from "./product.css";

import { type Product } from "api/product/types/product";
import { Link } from "@remix-run/react";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: style },
];

export default function ProductCard({ product, useLink = true }: { product: Product & { hasStock: 'Y' | 'N' }, useLink?: boolean }) {
    return (
        <>
            {useLink && <Link className="card" to={`product/${product.id}`}>
                <div className="name-product">
                    <p>{product.name}</p >
                </div>
                <img
                    alt={product.name}
                    src={product.image}
                    className={product.hasStock === 'Y' ? "" : "disabled"}
                >
                </img>
            </Link>
            }

            {!useLink && <div className="card">
                <div className="name-product">
                    <p>{product.name}</p >
                </div>
                <img
                    alt={product.name}
                    src={product.image}
                    className={product.hasStock === 'Y' ? "" : "disabled"}
                >
                </img>
            </div>
            }
        </>
    );
}