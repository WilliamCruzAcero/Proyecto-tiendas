import { Sequelize } from 'sequelize';

const connection = new Sequelize('store_project', 'root', 'example', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export default connection;

