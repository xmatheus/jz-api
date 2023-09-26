import { UpdatePokemonsData } from "../repositories/PokemonsRepository";
import { InMemoryPokemonsRepository } from "../test/repositories/inMemoryPokemonRepository";
import { Pokemon, CreatePokemonsRequest } from "./Pokemos";

describe("Pokemon", () => {
    it("shoud be able to create a new pokemon", async () => {
        const inMemoryPokemonsRepository = new InMemoryPokemonsRepository();
        const pokemon = new Pokemon(inMemoryPokemonsRepository);
        const expectedData = {
            tipo: "charizard",
            treinador: "junin",
        } as CreatePokemonsRequest;

        await expect(pokemon.create(expectedData)).resolves.not.toThrow();

        expect(inMemoryPokemonsRepository.pokemons).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    tipo: "charizard",
                    treinador: "junin",
                }),
            ])
        );
    });

    it("shoud not be able to create a new pokemon with invalid tipo", async () => {
        const inMemoryPokemonsRepository = new InMemoryPokemonsRepository();
        const pokemon = new Pokemon(inMemoryPokemonsRepository);
        const expectedData = {
            tipo: "junin",
            treinador: "junin",
        };

        await expect(
            pokemon.create(expectedData as CreatePokemonsRequest)
        ).rejects.toThrow();

        expect(inMemoryPokemonsRepository.pokemons).toEqual([]);
    });
});

describe("UpdatePokemon", () => {
    it("shoud be able to update pokemon", async () => {
        const inMemoryPokemonsRepository = new InMemoryPokemonsRepository();
        const pokemon = new Pokemon(inMemoryPokemonsRepository);
        const newPokemon = {
            tipo: "charizard",
            treinador: "junin",
        } as CreatePokemonsRequest;

        const createdPokemon = await pokemon.create(newPokemon);

        const expectedData = {
            ...createdPokemon,
            treinador: "marquinhos",
        } as UpdatePokemonsData;

        await expect(pokemon.update(expectedData)).resolves.not.toThrow();

        expect(inMemoryPokemonsRepository.pokemons).toEqual(
            expect.arrayContaining([expect.objectContaining(expectedData)])
        );
    });

    it("shoud not be able to update pokemon", async () => {
        const inMemoryPokemonsRepository = new InMemoryPokemonsRepository();
        const pokemon = new Pokemon(inMemoryPokemonsRepository);

        const data = {
            treinador: "marquinhos",
        } as UpdatePokemonsData;

        await expect(pokemon.update(data)).rejects.toThrow();

    });

});

describe("GetPokemon", () => {
    it("shoud be able to get a pokemon", async () => {
        const inMemoryPokemonsRepository = new InMemoryPokemonsRepository();
        const pokemon = new Pokemon(inMemoryPokemonsRepository);
        const newPokemon = {
            tipo: "charizard",
            treinador: "junin",
        } as CreatePokemonsRequest;

        const createdPokemon = await pokemon.create(newPokemon);
        const foundPokemon = await pokemon.get({id: createdPokemon.id});

        expect(foundPokemon).toEqual(createdPokemon);
    });

    it("shoud not be able to get a pokemon", async () => {
        const inMemoryPokemonsRepository = new InMemoryPokemonsRepository();
        const pokemon = new Pokemon(inMemoryPokemonsRepository);
        const newPokemon = {
            tipo: "charizard",
            treinador: "junin",
        } as CreatePokemonsRequest;

        await pokemon.create(newPokemon);
        const foundPokemon = await pokemon.get({id: 99999});

        expect(foundPokemon).toEqual(null);
    });
});
