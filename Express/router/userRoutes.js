const express = require("express");
const router = express.Router()
const {getUser,seeUser} = require("../controllers/userGet.js")



router.put("/",getUser)
router.get("/",seeUser)



module.exports = router
