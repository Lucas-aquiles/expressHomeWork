const { DataTypes } = require('sequelize');
const sequelize = require('./db');


const Usuario = sequelize.define('Usuario', {
  // Model attributes are defined here
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contrasena: {
    type: DataTypes.STRING, // Agregar una coma aquí
    allowNull: true // allowNull defaults to true
  }
}, {
  timestamps: false
  // Other model options go here
});

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING, // Agregar una coma aquí
    allowNull: true // allowNull defaults to true
  }
}, {
  timestamps: false
  // Other model options go here
});




(async () => {
  await sequelize.sync();
  console.log('Modelo User sincronizado con la base de datos.');
})();


module.exports= User,Usuario