import type { CreationOptional, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes } from "sequelize";
import { Model, DataTypes, } from 'sequelize'
import type { DatabaseProduct } from "../product/model";
import connection from "../database/connection";

export class DatabaseStore extends Model<InferAttributes<DatabaseStore>, InferCreationAttributes<DatabaseStore>> {
  declare id: CreationOptional<number>;
  declare logo: string;
  declare name: string;
  declare nit: string;
  declare address: string;
  declare phone: number; 
  declare active: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getProducts: HasManyGetAssociationsMixin<DatabaseProduct>;
} 

DatabaseStore.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    logo: DataTypes.STRING,
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    nit : DataTypes.STRING,    
    address : {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    phone : {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: connection,
    tableName: 'stores'
  }
);