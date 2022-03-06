const getPokemonUrl = id =>` https://pokeapi.co/api/v2/pokemon/${id}`
const generatedPokemonPromises = () => Array(150).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    accumulator += `
        <li class="card" ${elementTypes[0]}>
            <img class="card-image" alt="${name}" src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/> 
            <h2 class = "card-title">${id}.${name}</h2>
            <p class = "card-subtitle">${elementTypes.join(' | ')}</p>
        </li>
    ` // https://pokeres.bastionbot.org/images/pokemon/ --> api de gerar imagens com problema, usada um github para gerar as imagens pego do site https://www.jamesqquick.com/blog/build-a-pokedex-with-vanilla-javascript-part-2
    return accumulator
    }, '');

const insertPokemosIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatedPokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemosIntoPage)


