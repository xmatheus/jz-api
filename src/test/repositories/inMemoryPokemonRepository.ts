import { Pokemon } from "@prisma/client";
import crypto from "node:crypto";
import {
    CreatePokemonsData,
    PokemonsRepository,
    UpdatePokemonsData,
} from "../../repositories/PokemonsRepository";

export class InMemoryPokemonsRepository implements PokemonsRepository {
    public pokemons: Pokemon[] = [];

    async create(data: CreatePokemonsData) {
        const pokemon = {
            id: crypto.randomInt(99999),
            nivel: 1,
            ...data,
        };

        this.pokemons.push(pokemon);

        return pokemon;
    }

    async update(data: UpdatePokemonsData) {
        const pokemon = this.pokemons.find((item) => item.id === data.id);
        if (!pokemon) {
            return;
        }
        pokemon.treinador = data.treinador;
    }

    async get(data: UpdatePokemonsData) {
        const pokemon = this.pokemons.find((item) => item.id === data.id);
        return pokemon || null;
    }

    async delete(data: UpdatePokemonsData) {
        this.pokemons = this.pokemons.filter((item) => item.id !== data.id);
    }
    async list() {
        return this.pokemons;
    }
}
