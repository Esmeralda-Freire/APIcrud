const express = require("express")
const mongoose = require('mongoose');
const app = express()

app.use(express.json())
const port = 3000

const Pet = mongoose.model('Pet', {
    fotoUrl: String,
    nome: String,
    idade: String
})

app.get('/', async (req, res) => {
    const pets = await Pet.find()
    return res.send(pets)
})

app.delete("/delete/:id", async (req, res) => {
    const pets = await Pet.findByIdAndDelete(req.params.id)
    return res.send(pets)
})

app.put("/update/:id", async (req, res) => {
    const pets = await Pet.findByIdAndUpdate(req.params.id, {
        fotoUrl: req.body.fotoUrl,
        nome: req.body.nome,
        idade: req.body.idade
    })
    return res.send(pets)

})

app.post("/create", async (req, res) => {

    try {
        const pets = await Pet.create(req.body)
        return res.status(200).json(pets);


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message })
    }

})

app.listen(port, () => {
    mongoose.connect('mongodb://esmeraldasfn:BjWAbYxurJEsI4TP@ac-xt8blsq-shard-00-00.bnnbzqw.mongodb.net:27017,ac-xt8blsq-shard-00-01.bnnbzqw.mongodb.net:27017,ac-xt8blsq-shard-00-02.bnnbzqw.mongodb.net:27017/?ssl=true&replicaSet=atlas-orbatc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
    console.log(`Rodando na porta ${port}`)
})