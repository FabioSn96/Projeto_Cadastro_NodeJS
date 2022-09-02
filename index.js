const express = require("express")
const server = express()
const mongoose = require("mongoose")


server.use(
    express.urlencoded({
        extended: true,
    })
)
server.use(express.json())

// rotas de API
const userRoutes = require('./routes/userRoutes')

server.use('/users', userRoutes)

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/projetocadastro").then(() => {
    console.log("Conectado ao Mongo!")
}).catch((err) => {
    console.log("Erro ao se conectar: "+err)
})



server.listen(3000, () => {
    console.log("Servidor rodando na porta http://localhost:3000/")
})