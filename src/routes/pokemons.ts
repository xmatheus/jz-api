import { Router } from "express";
import { STATUS_CODE } from "../utils/status-code";
import { Pokemon } from "../services/Pokemos";
import { PrismaPokemonsRepository } from "../repositories/prisma/PrismaPokemonsRepository";

const router = Router();

router.post("/pokemons", async (req, res) => {
    const { tipo, treinador } = req.body;

    const prismaPokemonRepository = new PrismaPokemonsRepository();
    const pokemon = new Pokemon(prismaPokemonRepository);

    try {
        const createdPokemon = await pokemon.create({ tipo, treinador });

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
    const pokemon = new Pokemon(prismaPokemonRepository);

    try {
        await pokemon.update({ id: numericId, treinador });

        res.send(STATUS_CODE.NO_CONTENT);
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send({msg: "pokemon not updated"});
    }
});

router.get("/pokemons/:id", async (req, res) => {
    const { id } = req.params;
    const numericId = Number(id);

    const prismaPokemonRepository = new PrismaPokemonsRepository();
    const pokemon = new Pokemon(prismaPokemonRepository);

    try {
        const data = await pokemon.get({ id: numericId });

        res.send(data);
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send({msg: "pokemon not found"});
    }
});

router.delete("/pokemons/:id", async (req, res) => {
    const { id } = req.params;
    const numericId = Number(id);

    const prismaPokemonRepository = new PrismaPokemonsRepository();
    const pokemon = new Pokemon(prismaPokemonRepository);

    try {
        await pokemon.delete({ id: numericId });
        res.send(STATUS_CODE.NO_CONTENT);
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send({msg: "pokemon has not been excluded"});
    }
});

router.get("/pokemons", async (req, res) => {
    const prismaPokemonRepository = new PrismaPokemonsRepository();
    const pokemon = new Pokemon(prismaPokemonRepository);

    try {
        const data = await pokemon.list();
        res.send(data);
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send({msg: "error to get pokemons"});
    }
});

export default router;
