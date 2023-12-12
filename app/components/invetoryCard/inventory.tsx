import { type LinksFunction } from "@remix-run/node";
import styles from './inventory.css';
import type { Inventory } from "api/inventory/types/inventory";
import { Form } from "@remix-run/react";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
];

export default function InventoryCard({ inventory }: { inventory: Omit<Inventory, 'expiration'> & { expiration: string } }) {
    return (
        <div className="inventory">
            <Form method="post" >
                <label>
                    <input type="hidden" name="id" defaultValue={inventory.id} />
                    <span>Stock</span>
                    <input
                        defaultValue={inventory.stock}
                        name="stock"
                        type="number"
                    />
                    <span>$</span>
                    <input
                        defaultValue={inventory.price}
                        name="price"
                        type="number"
                    />
                    <span>Vence</span>
                    <input
                        defaultValue={inventory.expiration.split('T')[0]}
                        name="expiration"
                        type="date"
                    />
                    <button type="submit">Update</button>
                </label>
            </Form>
        </div>
    )
}