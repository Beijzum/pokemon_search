// Grabs value from HTML input and select fields
function getQueryString() {
    const queryObject = {
        id: idInputTextField.value,
        name: nameInputTextField.value,
        type: typeInputTextField.value,
        species: speciesInputTextField.value,
    };

    // URLSearchParams represents the query string of a URL and returns a URL-encoded query string
    return new URLSearchParams(queryObject).toString();
}

async function getPokemon() {
    const theQueryString = getQueryString();
    try {
        const url = theQueryString
            ? `http://localhost:3000/pokemon?${theQueryString}`
            : "/pokemon";
        const response = await fetch(url)

        console.log(`Response status: ${response.status}`);

        if (response.status === 200) {
            const pokemonResp = await response.json()
            displayPokemon(pokemonResp)
        } else if (response.status === 500) {
            console.log("Internal server error");
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
        const headers = ["Image", "ID", "Name", "Type", "Species", "Description"];
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

            // ID data
            const dataID = document.createElement("td");
            dataID.textContent = pokemon.id;
            row.appendChild(dataID);

            // Name data
            const dataName = document.createElement("td");
            dataName.textContent = pokemon.name.english;
            row.appendChild(dataName);

            // Type data
            const dataType = document.createElement("td");
            dataType.textContent = pokemon.type.join(', ');
            row.appendChild(dataType);

            // Species data
            const dataSpecies = document.createElement("td");
            dataSpecies.textContent = pokemon.species;
            row.appendChild(dataSpecies);

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
    displayPokemon(pokemonResp);
}

main().catch((error) => console.error(`Error due to ${error}`));
enterKeyListener();

// Listens for enter key to be pressed and returns a click on the getUnicornButton
function enterKeyListener() {
    // Event is fired when HTML doc has been loaded and parsed
    document.addEventListener("DOMContentLoaded", () => {
        document.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                document.getElementById("getPokemonButton").click();
            }
        });
    });
}


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