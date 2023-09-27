import { Router } from "express";
import { STATUS_CODE } from "../utils/status-code";
import { Pokemon } from "../services/Pokemos";
import { PrismaPokemonsRepository } from "../repositories/prisma/PrismaPokemonsRepository";

const router = Router();

router.post("/pokemons", async (req, res) => {
    const { tipo, treinador } = req.body;

    const prismaPokemonRepository = new PrismaPokemonsRepository();
    const pokemonService = new Pokemon(prismaPokemonRepository);

    try {
        const createdPokemon = await pokemonService.create({ tipo, treinador });

        res.json(createdPokemon);
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE.BAD_REQUEST).send({msg: "pokemon not created"});
    }
});

router.put("/pokemons/:id", async (req, res) => {
    const { id } = req.params;
    const { treinador } = req.body;
    const numericId = Number(id);

    const prismaPokemonRepository = new PrismaPokemonsRepository();
    const pokemonService = new Pokemon(prismaPokemonRepository);

    try {
        await pokemonService.update({ id: numericId, treinador });

        res.sendStatus(STATUS_CODE.NO_CONTENT);
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send({msg: "pokemon not updated"});
    }
});

router.get("/pokemons/:id", async (req, res) => {
    const { id } = req.params;
    const numericId = Number(id);

    const prismaPokemonRepository = new PrismaPokemonsRepository();
    const pokemonService = new Pokemon(prismaPokemonRepository);

    try {
        const data = await pokemonService.get({ id: numericId });

        res.send(data);
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send({msg: "pokemon not found"});
    }
});

router.delete("/pokemons/:id", async (req, res) => {
    const { id } = req.params;
    const numericId = Number(id);

    const prismaPokemonRepository = new PrismaPokemonsRepository();
    const pokemonService = new Pokemon(prismaPokemonRepository);

    try {
        await pokemonService.delete({ id: numericId });
        res.sendStatus(STATUS_CODE.NO_CONTENT);
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send({msg: "pokemon has not been excluded"});
    }
});

router.get("/pokemons", async (req, res) => {
    const prismaPokemonRepository = new PrismaPokemonsRepository();
    const pokemonService = new Pokemon(prismaPokemonRepository);

    try {
        const data = await pokemonService.list();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE.BAD_REQUEST).send({msg: "error to get pokemons"});
    }
});

router.post("/pokemons/battle", async (req, res) => {
    const { id1, id2 } = req.body;

    if (isNaN(id1) || isNaN(id2)) {
        res.status(STATUS_CODE.BAD_REQUEST).send({ msg: "Invalid IDs" });
        return;
    }

    const numericId1 = Number(id1);
    const numericId2 = Number(id2);

    const prismaPokemonRepository = new PrismaPokemonsRepository();
    const pokemonService = new Pokemon(prismaPokemonRepository);

    try {
        const { winner, loser } = await pokemonService.battle({ id1: numericId1, id2: numericId2 });


        res.json({
            vencedor: winner,
            perdedor: loser,
        });
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send({ msg: "Error in pokemon battle" });
    }
});

export default router;
