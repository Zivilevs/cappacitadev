const { databaseConnection } = require(`./connection`)

async function salvarPokemons(pokemon) {
    let result = false
    try {
        const queryInsertPokemon = `INSERT INTO pokemons(nome, tipo) VALUES ('${pokemon.nome}', '${pokemon.tipo}')`
        result = await databaseConnection.raw(queryInsertPokemon) // async before function and await before excecucao demorada, para puder continuar 
    } catch (err) {
        console.error("Something went wrong with your connection")
        console.error(err)
    }
    if(result){
        return{
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            id: result[0].insertId

        }
    }else{
        console.error("Deu erro com 'result' retorno") 
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function mostrarPokemon(id) {
    
    const querySelectPokemon = `SELECT * FROM pokemons WHERE id=${id}`
    const result = await databaseConnection.raw(querySelectPokemon)
        
    return result[0]
}


async function mostrarPokemons() {

    const querySelectPokemons = `SELECT * FROM pokemons;`
    const result = await databaseConnection.raw(querySelectPokemons)
    return result[0]
}

function atualizarPokemon(id, pokemon) {
    pokemons[id] = pokemon
    return pokemon
}

function deletarPokemon(id) {
    sequence._id  = sequence._id - 1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id, 1)
    pokemons.forEach(pokemon => {
        if (pokemon.id > id) {
            pokemon.id = pokemon.id - 1
        }
    })
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
