const { databaseConnection } = require(`./connection`)

async function salvarPokemons(pokemon) {

    let result = false
    const insertPokemon = {
        nome: pokemon.nome,
        tipo: pokemon.tipo,
        local_origem: pokemon.local_origem,
    }
    try {
        result = await databaseConnection('pokemons').insert(insertPokemon)
        console.log(result)
    } catch (err) {
        console.error("Something went wrong with your connection")
        console.error(err)
    }
    if(result){
        return{
            ...pokemon, 
            id: result[0],

        }
    }else{
        console.error("Deu erro com 'result' retorno") 
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function mostrarPokemon(id) {
    
    const result = await databaseConnection('pokemons').where('id', id)        
    return result[0]
}


async function mostrarPokemons() {

    const result = await databaseConnection('pokemons')
    return result
}

async function atualizarPokemon(id, pokemon) {

    const updatePokemon = {
        nome: pokemon.nome,
        tipo: pokemon.tipo,
        local_origem: pokemon.local_origem,
    }
    const result = await databaseConnection('pokemons').where({id}).update(updatePokemon)
    if(result){
        return{
            ...pokemon, 
            id: idk,

        }
    }else{
        console.error("Deu erro com 'result' retorno") 
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function deletarPokemon(id) {

    const pokemonDeletado = await databaseConnection('pokemons').where({id})[0]
    const result = await databaseConnection('pokemons').where({id}).del()
    return pokemonDeletado
}

function batalhaPokemon(id1, id2) {
    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

    if (pokemon1.hp != 0 && pokemon2.hp != 0) {
        if (pokemon1.tipo == pokemon2.fraqueza) {
            pokemon2.hp = pokemon2.hp - superEfetivo
        } else if (pokemon1.tipo == pokemon2.resistencia) {
            pokemon2.hp = pokemon2.hp - naoEfetivo
        } else {
            pokemon2.hp = pokemon2.hp - efetivo
        }
    }

    if (pokemon1.hp != 0 && pokemon2.hp != 0) {
        if (pokemon2.tipo == pokemon1.fraqueza) {
            pokemon1.hp = pokemon1.hp - superEfetivo
        } else if (pokemon2.tipo == pokemon1.resistencia) {
            pokemon1.hp = pokemon1.hp - naoEfetivo
        } else {
            pokemon1.hp = pokemon1.hp - efetivo
        }
    }

    if (pokemon1.hp < 0) pokemon1.hp = 0
    if (pokemon2.hp < 0) pokemon2.hp = 0

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
}

function receberPocao(id) {
    const pocao = 20
    const pokemonCuidado = pokemons[id]
    
    if (pokemonCuidado.hp == 100) {
        return `${pokemonCuidado.nome} pediu uma poção, mas HP dele já está 100!`
    } else if ((100 - pokemonCuidado.hp) <= 20) {
        pokemonCuidado.hp = 100
    } else {
        pokemonCuidado.hp = pokemonCuidado.hp + pocao
    }
    return `${pokemonCuidado.nome} recebeu uma poção! HP dele agora é ${pokemonCuidado.hp}`
}

module.exports = {salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon, batalhaPokemon, receberPocao}
