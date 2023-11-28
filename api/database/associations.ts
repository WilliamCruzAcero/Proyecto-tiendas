// las asociaciones de los modelos se deben
// estables antes de ejecutar cualquiera de las funciones de asociacion Mixin
// este arrchivo es lo primero en importar en la entrada del proyexto
// server.js
//  import express from 'express';
//  import "./database/associations.ts"

import { DatabaseInventory } from "../inventory/modelInventory";
import { DatabaseProduct } from "../product/modelProduct";
import { DatabaseStore } from "../store/modelStore";

DatabaseStore.hasMany(DatabaseProduct, {foreignKey: 'store'});
DatabaseProduct.belongsTo(DatabaseStore, {foreignKey: 'store'});
DatabaseProduct.hasMany(DatabaseInventory, {foreignKey: 'product'});
DatabaseInventory.belongsTo(DatabaseProduct, {foreignKey: 'product'}); 