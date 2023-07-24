const express = require("express");
const pool = require("./db");
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conecta a la base de datos
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error al obtener una conexión:", err);
  } else {
    console.log("Conexión obtenida de la pool");
    // ... Realizar operaciones con la base de datos ...
    connection.release(); // Liberar la conexión para que otros puedan usarla
  }
});

// Crea la tabla "usuario" si no existe
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
  } else {
    connection.query(
      `
      CREATE TABLE IF NOT EXISTS usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre_usuario VARCHAR(50) NOT NULL,
        contrasena VARCHAR(255) NOT NULL
      )
    `,
      (err) => {
        connection.release(); // Liberar la conexión para que otros puedan usarla

        if (err) {
          console.error('Error al crear la tabla "usuario":', err);
        } else {
          console.log(
            'Tabla "usuario" creada o ya existente en la base de datos'
          );
          // Rutas y controladores vendrían después...
        }
      }
    );
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// Secret key para firmar los tokens JWT
const secretKey = "miClaveSecreta";

// Ruta para registrar un nuevo usuario
app.post("/registro", async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  // Verifica que se hayan proporcionado el nombre de usuario y la contraseña
  if (!nombre_usuario || !contrasena) {
    return res.status(400).json({
      error: "Debe proporcionar el nombre de usuario y la contraseña",
    });
  }

  // Hash de la contraseña antes de guardarla en la base de datos
  const hashedPassword = await bcrypt.hash(contrasena, 10);

  // Inserta el usuario en la base de datos

  // Inserta el usuario en la base de datos
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error de conexión a la base de datos:", err);
      return res
        .status(500)
        .json({ error: "Error de conexión a la base de datos" });
    }

    const query =
      "INSERT INTO usuario (nombre_usuario, contrasena) VALUES (?, ?)";
    connection.query(query, [nombre_usuario, hashedPassword], (err, result) => {
      connection.release(); // Liberar la conexión para que otros puedan usarla

      if (err) {
        console.error("Error al insertar el usuario en la base de datos:", err);
        return res
          .status(500)
          .json({ error: "Error al insertar el usuario en la base de datos" });
      }

      // La operación se completó con éxito, puedes enviar una respuesta exitosa
      res.status(200).json({ message: "Usuario registrado con éxito" });
    });
  });
});





app.post("/login", (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  // Buscar el usuario en la base de datos
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
      return res.status(500).json({ error: 'Error de conexión a la base de datos' });
    }

    const query = "SELECT * FROM usuario WHERE nombre_usuario = ?"; 
    connection.query(query, [nombre_usuario], async (err, result) => {
      connection.release(); // Liberar la conexión para que otros puedan usarla

      if (err) {
        console.error('Error al buscar el usuario en la base de datos:', err);
        return res.status(500).json({ error: 'Error al buscar el usuario en la base de datos' });
      }

      // Verificar si se encontró el usuario
      if (result.length === 0) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      const user = result[0];

      // Verificar la contraseña ingresada con el hash almacenado en la base de datos
      try {
        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Generar un token JWT válido por cierto tiempo (por ejemplo, 1 hora)
        const secretKey = 'miClaveSecreta'; // Reemplazar con tu propia clave secreta para JWT
        const token = jwt.sign({ 
          userId: user.id ,userName: user.nombre_usuario }, secretKey, { expiresIn: "1h" });

        res.json({ token });
      } catch (error) {
        console.error('Error al comparar contraseñas:', error);
        return res.status(500).json({ error: 'Error al autenticar el usuario' });
      }
    });
  });
});
  
  

//
// Ruta protegida para acceder al perfil del usuario
app.get("/perfil", (req, res) => {
  // Verificar si el token de autenticación es válido
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Token no proporcionado");
  }

  try {
    // Verificar y decodificar el token
    // Reemplazar con tu propia clave secreta para JWT
    const decodedToken = jwt.verify(token, secretKey);

    // Utilizar la información del token para identificar al usuario y proporcionar acceso al recurso
    const userId = decodedToken.userId;
   
    // Aquí, en lugar de buscar en la matriz "users", haremos una consulta a la base de datos para obtener el usuario
    pool.getConnection((err, connection) => {
    
      const query = "SELECT * FROM usuario WHERE id = ?";
      connection.query(query, [userId], (err, result) => {
        connection.release(); // Liberar la conexión para que otros puedan usarla

        // Verificar si se encontró el usuario
        if (result.length === 0) {
          return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const user = result[0];
        

        // Aquí, en lugar de usar la matriz "users", utilizaremos los datos del usuario obtenidos de la base de datos
        res.send(`Bienvenido, ${user.nombre_usuario}!`);
      });
    });
    
    
  } catch (error) {
    res.status(401).send("Token inválido");
  }
});

//

//--------------------------------------------------------------------------------------
app.get("/usuario", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error de conexión a la base de datos:", err);
      return res
        .status(500)
        .json({ error: "Error de conexión a la base de datos" });
    }

    const selectQuery = "SELECT * FROM usuario";
    connection.query(selectQuery, (err, result) => {
      if (err) {
        console.error("Error al obtener los usuario: ", err.message);
        res.status(500).json({ error: "Error al obtener los usuarios" });
      } else {
        // Envío de respuesta al cliente con la lista de usuarios
        res.status(200).json(result);
      }
    });
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
