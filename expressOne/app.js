const express = require("express")
const app = express()

//  middlewarre
app.use(express.static('public'));
app.set('view engine', 'pug')
// app.set('views', './views');


//route
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', messages: "Hello gente queridaaaaaaa!"})
})

app.get('/peticion', (req, res) => {
  const data = {
    message: '¡Hola desde el servidor!',
    additionalMessage: 'Este es un párrafo adicional desde el servidor.',
  };

  res.json(data); 
})


//listen server, port 
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })


