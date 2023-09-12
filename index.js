// config inicial
const express = require('express') // importou o express
const mongoose = require('mongoose')
const app = express() // inicializou o express



// forma de ler JSON / middlewares recursos que são utilizados entre requisição e resposta
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

// rotas da API

const carRoutes = require('./routes/carRoutes')

app.use('/car', carRoutes)
// rota inicial / endpoint
app.get('/', (req, res) => {
  // mostra req
  res.json({ message: 'Hello Express' })
})
// mongodb+srv://pablo:<pablo123>@apicluster.yny5jfr.mongodb.net/?retryWrites=true&w=majority
// entregar uma porta pro express saber onde vai disponibilizar essa aplicação
const DB_USER = 'pablo'
const DB_PASSWORD = encodeURIComponent('pablo123')

mongoose
.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.yny5jfr.mongodb.net/bancodaapi?retryWrites=true&w=majority`
  )
.then(() => {
  console.log('Conectamos ao mongoDB!')
  app.listen(3000)
})
.catch((err) => console.log(err))
