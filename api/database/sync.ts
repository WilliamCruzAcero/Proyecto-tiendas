import './associations';
import { DatabaseInventory } from "../inventory/model";
import { DatabaseProduct } from "../product/model";
import { DatabaseStore } from "../store/model";
import { DatabaseUser } from 'api/user/model';

const sync = async () => {
    await DatabaseStore.sync({ alter: true });
    await DatabaseProduct.sync({ alter: true });
    await DatabaseInventory.sync({ alter: true });
    await DatabaseUser.sync({ alter: true });   
}

sync();