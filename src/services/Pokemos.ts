import { PokemonsRepository } from "../repositories/PokemonsRepository";

type PokemonType = "charizard" | "mewtwo" | "pikachu";

export interface CreatePokemonsRequest {
    tipo: PokemonType;
    treinador: string;
}

export interface UpdatePokemonsRequest {
    id: number;
    treinador: string;
    nivel?: number
}

export interface GetPokemonsRequest {
    id: number;
}
export interface DeletePokemonsRequest {
    id: number;
}

export interface BattlePokemonsRequest {
    id1: number;
    id2: number;
}

const pokemonTypes: PokemonType[] = ["charizard", "mewtwo", "pikachu"];

export class Pokemon {
    constructor(private pokemonsRepository: PokemonsRepository) {}

    async create({ tipo, treinador }: CreatePokemonsRequest) {
        if (!tipo) {
            throw new Error("Missing 'tipo'");
        }

        if (!treinador) {
            throw new Error("Missing 'treinador'");
        }

        if (!pokemonTypes.includes(tipo)) {
            throw new Error("invalid pokemon");
        }

        return await this.pokemonsRepository.create({ tipo, treinador });
    }

    async update({ id, treinador, nivel }: UpdatePokemonsRequest) {
        if (!id) {
            throw new Error("Missing 'id'");
        }

        await this.pokemonsRepository.update({ id, treinador, nivel });
    }

    async get({ id }: GetPokemonsRequest) {
        if (!id) {
            throw new Error("Missing 'id'");
        }

        const pokemon = await this.pokemonsRepository.get({ id });
        return pokemon;
    }

    async delete({ id }: DeletePokemonsRequest) {
        if (!id) {
            throw new Error("Missing 'id'");
        }

        await this.pokemonsRepository.delete({ id });
    }

    async list() {
        return await this.pokemonsRepository.list();
    }

    async battle({ id1, id2 }: BattlePokemonsRequest) {
        const pokemon1 = await this.get({ id: id1 });
        const pokemon2 = await this.get({ id: id2 });

        if (!pokemon1 || !pokemon2) {
            throw new Error("Pokemons not found");
        }

        const probabilityWin1 = pokemon1.nivel / (pokemon1.nivel + pokemon2.nivel);

        const battleResult = Math.random();

        let winner, loser;

        if (battleResult < probabilityWin1) {
            winner = pokemon1;
            loser = pokemon2;
        } else {
            winner = pokemon2;
            loser = pokemon1;
        }

        winner.nivel += 1;
        loser.nivel -= 1;

        if (loser.nivel <= 0) {
            await this.delete({ id: loser.id });
        } else {
            await this.update(loser);
        }

        await this.update(winner);
        return { winner, loser };
    }
}
