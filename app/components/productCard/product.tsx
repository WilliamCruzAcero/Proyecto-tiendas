import type { LinksFunction } from "@remix-run/node";
import style from "./product.css";
import { Link } from "@remix-run/react";
import { type Product } from "api/product/types/product";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: style },
];

export default function ProductCard({ product, useLink = true }: { product: Product & { hasStock: 'Y' | 'N' }, useLink?: boolean }) {
    return (
        <div className="card">
            <div className="name-product">
                {useLink && <Link to={`product/${product.id}`} >{product.name}</Link >}
                {!useLink && <p>{product.name}</p >}
            </div>
            <img
                alt={product.name}
                src={product.image}
                className={ product.hasStock === 'Y' ? "" : "disabled"}
            >
            </img>
        </div>
    );
}