import { PokemonsRepository } from "../repositories/PokemonsRepository";

type PokemonType = "charizard" | "mewtwo" | "pikachu";

export interface CreatePokemonsRequest {
    tipo: PokemonType;
    treinador: string;
}

export interface UpdatePokemonsRequest {
    id: number;
    treinador: string;
}

export interface GetPokemonsRequest {
    id: number;
}
export interface DeletePokemonsRequest {
    id: number;
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

    async update({ id, treinador }: UpdatePokemonsRequest) {
        if (!id) {
            throw new Error("Missing 'id'");
        }

        await this.pokemonsRepository.update({ id, treinador });
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
}
