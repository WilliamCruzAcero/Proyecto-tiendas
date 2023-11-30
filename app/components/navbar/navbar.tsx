import type { LinksFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
import appStylesHref from "./navbar.css";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: appStylesHref },
];

export default function Navbar() {

    return (
        <nav>
            <ul className="horizontal">
                <li>
                    <NavLink
                        className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}
                        to="/">Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}
                        to="/store">Store
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}
                        to="/login">Login
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}
                        to="/logout">Logout
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}