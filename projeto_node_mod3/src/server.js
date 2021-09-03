const express = require('express')
const app = express()
const dataBase = require('./database/databaseKnex')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/pokemons', async (req, res) => {
    res.send(await dataBase.mostrarPokemons())
})

app.get('/pokemons/:id', async (req, res) => {
    const pokemon = await dataBase.mostrarPokemon(req.params.id)
    res.send(pokemon)
    })

app.post('/pokemons', async (req, res) => {
    const pokemon = await dataBase.salvarPokemons({
        nome: req.body.nome,
        tipo: req.body.tipo,
        local_origem: req.body.local_origem,
        //fraqueza: req.body.fraqueza,
        //resistencia: req.body.resistencia,
        hp: 100
    })
    res.send(pokemon)
})

app.put('/pokemons/:id', async (req, res) => {
    const pokemon = await dataBase.atualizarPokemon(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        local_origem: req.body.local_origem,
        //fraqueza: req.body.fraqueza,
        //resistencia: req.body.resistencia,
    })
    res.send(pokemon)
})

app.delete('/pokemons/:id', async (req, res) => {
    res.send(await dataBase.deletarPokemon(req.params.id))
})

app.post('/batalha', (req, res) => {
    res.send(dataBase.batalhaPokemon(req.body.id1, req.body.id2))
})

app.post('/pocao', (req, res) => {
    res.send(dataBase.receberPocao(req.body.id))
})


app.listen(3003)