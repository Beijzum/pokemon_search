const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;

const pokemonDataUrl = "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/pokedex.json";

app.get("/pokemon", async (req, res) => {
    try {
        // Fetch the data
        const response = await axios.get(pokemonDataUrl);
        let pokemonData = response.data;
        let pokemonQuery = pokemonData;

        // Apply filters conditionally
        if (req.query.name) {
            const searchName = req.query.name.toLowerCase();
            pokemonQuery = pokemonQuery.filter(pokemon =>
                pokemon.name.english.toLowerCase().includes(searchName));
        }

        if (req.query.type) {
            const searchType = req.query.type.toLowerCase();
            pokemonQuery = pokemonQuery.filter(pokemon =>
                pokemon.type.some(type => type.toLowerCase().includes(searchType)));
        }

        if (req.query.species) {
            const searchSpecies = req.query.species.toLowerCase();
            pokemonQuery = pokemonQuery.filter(pokemon =>
                pokemon.species.toLowerCase().includes(searchSpecies));
        }

        if (req.query.id) {
            const searchId = Number(req.query.id);
            pokemonQuery = pokemonQuery.filter(pokemon => pokemon.id === searchId);
        }

        // console.log(pokemonQuery);
        res.json(pokemonQuery); // Return the filtered data

    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send("An error occurred while fetching data.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// async function setup() {
//     try {
//         const response = await axios.get(pokemonDataUrl);
//         return response.data;
//     } catch (error) {
//         console.error(`Failed to fetch Pokémon data: ${error}`);
//     }
// }

// setup().catch((err) => console.error(`Error due to ${err}`));


// async function main() {
//     const pokemonData = await setup();
//     if (pokemonData) {
//         console.log(pokemonData);
//     } else {
//         console.log("No Pokémon data available.");
//     }
// }

// main().catch((err) => console.error(`Error due to ${err}`));