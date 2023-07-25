const express = require("express");
const router = express.Router()
const userRoutes = require("./userRoutes")
const birdRoutes = require("./birdRoutes")


router.use("/user", userRoutes);
router.use("/birds",birdRoutes)


module.exports= router
