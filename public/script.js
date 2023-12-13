async function getPokemon() {
    const theQueryString = getQueryString();
    try {
        const url = theQueryString
            ? `http://localhost:3000/pokemon?${theQueryString}`
            : "/pokemon";
        const response = await fetch(url)

        console.log(`Response status: ${response.status}`);

        if (response.status === 200) {
            const pokemon = await response.json()
            displayPokemon(pokemon)
        }
    } catch (error) {
        console.error(`Error due to ${error}`)
    }
}

async function displayPokemon(pokemon) {
    const pokemonContainer = document.getElementById("pokemonContainer");
    pokemonContainer.innerHTML = "";

    try {
        if (pokemon.length <= 0) {
            const noPokemon = document.createElement("p");
            noPokemon.innerHTML = "<p id='noPokemon'>No Pokemon found with those attributes!</p>"
            pokemonContainer.appendChild(noPokemon);
            return;
        }
        pokemon.innerHTML +=
            `<div>
        <img src=${pokemon.image.thumbnail}
        <p>${pokemon.name}</p>
        <p>${pokemon.type}</p>
        </div>`

    } catch (error) {
        console.error(`Error due to ${error}`)
    }
}