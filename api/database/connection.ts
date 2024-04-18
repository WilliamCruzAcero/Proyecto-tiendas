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


//    X;UGzFQtG8Or     WpPay7tCHA;Q


//   dsv6dYVDZf;O

// test_1'@'localhost   test125A;#


//  CODIGO PARA LA INSTANCIA
// #!/bin/bash -ex

// #Update yum
// yum -y update

// # Add node´s source repo
// curl -sL https://rpm.nodesource.com/setup_20.x | bash -

// # Install nodejs
// yum -y install nodejs

// # Create a dedicated directory for the application
// mkdir -p /var/app

// # Get the app form S3
// wget https://aws-tc-largeobjects.s3-us-west-2.amazonaws.com/ILT-TF-100-TECESS-5/app/app.zip

// # unzip it into a specific folder
// unzip app.zip -d /var/app/
// cd /var/app/

// # Install dependencies
// npm installl

// # Start your app
// npm start 