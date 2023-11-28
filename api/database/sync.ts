import './associations';
import { DatabaseInventory } from "../inventory/modelInventory";
import { DatabaseProduct } from "../product/modelProduct";
import { DatabaseStore } from "../store/modelStore";

const sync = async () => {
    await DatabaseStore.sync({ alter: true });
    await DatabaseProduct.sync({ alter: true });
    await DatabaseInventory.sync({ alter: true });
}

sync();