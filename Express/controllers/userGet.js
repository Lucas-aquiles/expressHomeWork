// import Brands from "../models/Brands.js";
// Importar los modelos
const User = require("../models/user");
const Usuario = require("../models/usuarios");
const sequelize = require("../config/db");

const getUser = async (req, res) => {
  const jane = await User.create({
    firstName: "manuel",
    lastName: "Echegaray",
  });
  res.send("Hello Worlddddddddddd  spu lucas!");
};

const seeUser = async (req, res) => {
  const data = await sequelize.query("SELECT * FROM users");
  // console.log(data)
  //   const users = await User.findAll(); ;
  // // the name is still "Jane" in the database
  // let arrayData = []
  //  for(let i = 0; i< users.length;i++){
  //          arrayData.push(users[i].dataValues)
  //  }

  // res.json(arrayData)
  res.json(data[0]);
};


module.exports = { getUser, seeUser };
