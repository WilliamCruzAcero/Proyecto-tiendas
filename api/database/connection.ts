import { Sequelize } from 'sequelize';

const connection = new Sequelize('store_project', 'root', 'example', {
    host: 'my_sql',
    dialect: 'mysql',
    logging: false
});

export default connection;

// export const connection = new Sequelize({
//     dialect: 'mysql',
//     host: 'my_sql',
//     username: 'root',
//     password:'',
//     database: 'store_project',
//     logging: false,
//     models: [
//         DatabaseUser
//     ]
// });

// async function connectDB() {
//     try {
//         await connection.sync()
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default connectDB;

// export default connection;

// const connecDB = async () => {
//     try {
//         const connection = await new Sequelize('store_project', 'root', 'example', {
//             host: 'my_sql',
//             dialect: 'mysql',
//             logging: false
//         });
        
//         console.log('Base de datos conectada');
//         return connection
//     } catch (error) {
//         console.log('Error en la conexion a la base de datos' + error);
//     }
// }
// export default connecDB;