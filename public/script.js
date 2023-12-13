async function getPokemon() {
    try {
        const url = "/pokemon";
        const response = await fetch(url)

        console.log(`Response status: ${response.status}`);

        if (response.status === 200) {
            const pokemonResp = await response.json()
            displayPokemon(pokemonResp)
        }
    } catch (error) {
        console.error(`Error due to ${error}`)
    }
}

async function displayPokemon(pokemonResp) {
    const pokemonContainer = document.getElementById("pokemonContainer");
    pokemonContainer.innerHTML = "";

    try {
        if (pokemonResp.length <= 0) {
            const noPokemon = document.createElement("p");
            noPokemon.textContent = "No Pokemon found with those attributes!";
            pokemonContainer.appendChild(noPokemon);
            return;
        }

        const table = document.createElement("table");
        table.classList.add("pokemon-table");

        // Create a header row
        const headerRow = document.createElement("tr");

        // Define headers
        const headers = ["Image", "Name", "Type", "Description"];
        headers.forEach(headerText => {
            const header = document.createElement("th");
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        table.appendChild(headerRow);

        // Iterate over the Pokemon response
        for (let i = 0; i < pokemonResp.length; i++) {
            const pokemon = pokemonResp[i];
            const row = document.createElement("tr");

            // Image data
            const dataImage = document.createElement("td");
            const pokemonImage = document.createElement("img");
            pokemonImage.src = pokemon.image.thumbnail;
            pokemonImage.alt = `Image of ${pokemon.name.english}`;
            pokemonImage.loading = "lazy";
            dataImage.appendChild(pokemonImage);
            row.appendChild(dataImage);

            // Name data
            const dataName = document.createElement("td");
            dataName.textContent = pokemon.name.english;
            row.appendChild(dataName);

            // Type data
            const dataType = document.createElement("td");
            dataType.textContent = pokemon.type.join(', ');
            row.appendChild(dataType);

            // Description data
            const dataDescription = document.createElement("td");
            dataDescription.textContent = pokemon.description;
            row.appendChild(dataDescription);

            table.appendChild(row);
        }

        pokemonContainer.appendChild(table);
    } catch (error) {
        console.error(`Error due to ${error}`);
    }
}

async function main() {
    const response = await fetch("/pokemon");
    const pokemonResp = await response.json();
    // Displays all unicorns first
    displayPokemon(pokemonResp);
}

main().catch((error) => console.error(`Error due to ${error}`));


// for (let i = 0; i < pokemonResp.length; i++) {
//     const pokemon = pokemonResp[i];
//     const pokemonDiv = document.createElement("div");

//     // Image
//     const pokemonImage = document.createElement("img");
//     pokemonImage.src = pokemon.image.thumbnail; // Adjust according to your JSON structure
//     pokemonImage.alt = `Image of ${pokemon.name.english}`; // Use the English name for alt text
//     pokemonImage.loading = "lazy";
//     pokemonDiv.appendChild(pokemonImage);

//     // Name (English)
//     const pokemonName = document.createElement("p");
//     pokemonName.textContent = pokemon.name.english; // Displaying the English name
//     pokemonDiv.appendChild(pokemonName);

//     // Type
//     const pokemonType = document.createElement("p");
//     pokemonType.textContent = `Type: ${pokemon.type.join(', ')}`; // Joining the type array into a string
//     pokemonDiv.appendChild(pokemonType);

//     // Description
//     const pokemonDescription = document.createElement("p");
//     pokemonDescription.textContent = pokemon.description; // Adding description
//     pokemonDiv.appendChild(pokemonDescription);

//     pokemonContainer.appendChild(pokemonDiv);
// }