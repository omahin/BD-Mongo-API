const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//String de conexao
mongoose.connect("mongodb://localhost:27017/musics", { // no nosso caso nao temos usuario e senha, mas caso tivessemos poderiamos seguir esse formato: mongodb://username:password@localhost:27017/reprograma-trip
    useNewUrlParser: true, // define que vai utilizar a nova url parse da string de conexao
    useUnifiedTopology: true // define que vai utilizar o novo mecanismo de gerenciamento de conexao do driver do mongodb
});

let db = mongoose.connection

//Captura de erro ou sucesso na conexão
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function () {
    console.log("conexão feita com sucesso.")
})

const app = express()

//rotas
const index = require("./routes/index")
const musics = require("./routes/musics")

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use("/", index)
app.use("/musics", musics)

module.exports = app