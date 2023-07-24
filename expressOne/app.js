const express = require("express")
const app = express()

app.use(express.static('public'));


app.set('view engine', 'pug')
// app.set('views', './views');



app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: "Hello gente queridaaaaaaa!"})
})


app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })


