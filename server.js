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
        const pokemonData = response.data;

        // Filter by name
        if (req.query.name) {
            const searchQuery = req.query.name.toLowerCase();
            pokemonData = pokemonData.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchQuery))
        }

        if (req.query.type) {
            const searchQuery = req.query.type.toLowerCase();
            pokemonData = pokemonData.filter(pokemon =>
                pokemon.type.toLowerCase().includes(searchQuery))
        }

        res.json(pokemonData);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send("An error occurred while fetching data.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
