import type { BelongsToGetAssociationMixin, CreationOptional, ForeignKey, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes } from "sequelize";
import {DataTypes, Model} from 'sequelize';
import type { DatabaseInventory } from "../inventory/model";
import type { DatabaseStore } from "../store/model";
import connection from "../database/connection";

export class DatabaseProduct extends Model<InferAttributes<DatabaseProduct>, InferCreationAttributes<DatabaseProduct>> {
  public id!: CreationOptional<number>;
  declare store: ForeignKey<number>;
  public name!: string;
  declare image: string;
  declare active: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;

  declare createInventory: HasManyCreateAssociationMixin<DatabaseInventory, 'product'>;
  declare getInventories: HasManyGetAssociationsMixin<DatabaseInventory>;
  declare getStore: BelongsToGetAssociationMixin<DatabaseStore>;
}

DatabaseProduct.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    image: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'products',
    sequelize: connection
  }
);