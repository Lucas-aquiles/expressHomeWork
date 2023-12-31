const routes = require("./router/index");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();


// Importa la configuración de la conexión

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);






// app.get("/leer2",async (req, res) => {
//   // puedo usar SQLqueries , wowwwwwwwwwwwwwww
//     const data = await sequelize.query('SELECT * FROM usuario');
//   // console.log(data)
//   //   const users = await User.findAll(); ;
//   // // the name is still "Jane" in the database
//   // let arrayData = []
//   //  for(let i = 0; i< users.length;i++){
//   //          arrayData.push(users[i].dataValues)
//   //  }

//   // res.json(arrayData)
//   res.json(data[0])
//   });

// app.get("/cambio",async (req, res) => {
//   await User.update({ lastName: "Doe" }, {
//     where: {
//       lastName: "miguel"
//     }
//   });
// res.send("data")
// });

// app.delete("/",async(req,res)=>{
//   await User.destroy({
//     where: {
//       firstName: "Jane"
//     }
//   });
// })

// app.get("/users/:userId", (req, res) => {
//   let { userId } = req.params;
//   res.send("tu resultado es :" + userId);
// });

// app.get('/user/:id', (req, res, next) => {
//   // if the user ID is 0, skip to the next route
//   if (req.params.id === '0') next('route')
//   // otherwise pass the control to the next middleware function in this stack
//   else next()
// }, (req, res, next) => {
//   // send a regular response
//   res.send('regular')
// })

// // handler for the /user/:id path, which sends a special response
// app.get('/user/:id', (req, res, next) => {
//   res.send('special')
// })
// //---------------------------
// function logOriginalUrl (req, res, next) {
//   console.log('Request URL:', req.originalUrl)
//   next()
// }

// function logMethod (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// }

// const logStuff = [logOriginalUrl, logMethod]
// app.get('/userios/:id', logStuff, (req, res, next) => {
//   res.send('User Info')
// })



// const createTableUsuarios = `
//   CREATE TABLE usuarios (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     nombre VARCHAR(50) NOT NULL,
//     email VARCHAR(100) NOT NULL,
//     edad INT,
//     fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   )
// `;

// // Conectar a la base de datos y ejecutar la consulta para crear la tabla
// connection.connect((err) => {
//   if (err) {
//     console.error('Error al conectar a la base de datos: ', err.message);
//     return;
//   }
//   console.log('Conexión a la base de datos exitosa!');

//   connection.query(createTableUsuarios, (err, result) => {
//     if (err) {
//       console.error('Error al crear la tabla de usuarios: ', err.message);
//     } else {
//       console.log('Tabla de usuarios creada exitosamente!');
//     }
//     // Cierra la conexión después de ejecutar la consulta
//     connection.end();
//   });
// });

// app.get("/usuarios",(req,res)=>{
//   const selectQuery = 'SELECT * FROM usuarios';
//   connection.query(selectQuery, (err, result) => {
//     if (err) {
//       console.error('Error al obtener los usuarios: ', err.message);
//       res.status(500).json({ error: 'Error al obtener los usuarios' });
//     } else {
//       // Envío de respuesta al cliente con la lista de usuarios
//       res.status(200).json(result);
//     }
//   });
// });

// app.post('/registrar', (req, res) => {
//   const { nombre, email, edad } = req.body; // Asumiendo que usas body-parser o un middleware similar para analizar el cuerpo de la solicitud
// // console.log(nombre,email,edad)
//   const insertQuery = 'INSERT INTO usuarios (nombre, email, edad) VALUES (?, ?, ?)';

//   connection.query(insertQuery, [nombre, email, edad], (err, result) => {
//     if (err) {
//       console.error('Error al registrar el usuario: ', err.message);
//       res.status(500).json({ error: 'Error al registrar el usuario' });
//     } else {
//       console.log('Usuario registrado exitosamente!');
//       res.status(200).json({ message: 'Usuario registrado exitosamente' });
//     }
//   });
// });

// app.get('/enviarCookie', (req, res) => {
//   // Establecer una cookie con el nombre "miCookie" y el valor "Hola Mundo"
//   res.cookie('miCookie', 'Hola Mundo');

//   // Enviar una respuesta al cliente
//   res.send('Cookie enviada correctamente');
// });

module.exports = app
