// const mysql = require('mysql')
// const connection =
//  mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'pruebaexpress'
// })

// connection.connect()

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()


const { Sequelize, DataTypes } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('pruebaexpress', 'root','', {
    host: 'localhost',
    dialect: 'mysql'
});


async function testBDatos (){  
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testBDatos()








module.exports = sequelize;

