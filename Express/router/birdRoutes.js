const express = require("express");
const router = express.Router()
const birdFuntion = require("../controllers/bird.js")


// middleware that is specific to this router
router.use((req, res, next) => {
    const currentTime = new Date; 
     console.log('Time: ', (currentTime.toLocaleString()))
     next()
   })
   



router.get("/about",birdFuntion)


module.exports = router