import type { LinksFunction } from "@remix-run/node";
import style from "./product.css";
import type { ProductDetailed } from "api/product/types/productDetailed";
import { Link } from "@remix-run/react";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: style },
];

export default function ProductCard({ product }: { product: ProductDetailed }) {
    return (
        <div className="card">
            <div className="name-product">
                <Link to={`product/${product.id}`} >{product.name}</Link >
            </div>
            <img
                alt={product.name}
                src={product.image}
                className={ product.DatabaseInventories.some( i => i.stock > 0 ) ? "" : "disabled" }
            >
            </img>
        </div>
    );
}