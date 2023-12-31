import { prisma } from "../../prisma";
import {
    CreatePokemonsData,
    GetPokemonsData,
    PokemonsRepository,
    UpdatePokemonsData
} from "../PokemonsRepository";

export class PrismaPokemonsRepository implements PokemonsRepository {
    async create(data: CreatePokemonsData) {
        const pokemon = await prisma.pokemon.create({ data });
        return pokemon;
    }

    async update(data: Partial<UpdatePokemonsData>) {
        const { id } = data;
        delete data.id;
        await prisma.pokemon.update({
            where: { id },
            data,
        });
    }

    async get(data: GetPokemonsData) {
        const { id } = data;
        const pokemon = await prisma.pokemon.findFirst({
            where: { id }
        });

        return pokemon;
    }

    async delete(data: GetPokemonsData) {
        const { id } = data;
        await prisma.pokemon.delete({
            where: { id }
        });
    }

    async list() {
        return await prisma.pokemon.findMany();
    }
}
