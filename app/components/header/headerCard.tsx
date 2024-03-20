import type { Store } from "api/store/types/store";

export default function HeaderCard({store}: {store: Omit<Store, 'id'> & {id: number}}) {

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
        </div>
    )
}