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

    it("shoud not be able to create a new pokemon with invalid 'tipo'", async () => {
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

describe("UpdatePokemons", () => {
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

describe("GetPokemons", () => {
    it("shoud be able to get a pokemon", async () => {
        const inMemoryPokemonsRepository = new InMemoryPokemonsRepository();
        const pokemon = new Pokemon(inMemoryPokemonsRepository);
        const newPokemon = {
            tipo: "charizard",
            treinador: "junin",
        } as CreatePokemonsRequest;

        const createdPokemon = await pokemon.create(newPokemon);
        const foundPokemon = await pokemon.get({ id: createdPokemon.id });

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
        const foundPokemon = await pokemon.get({ id: 99999 });

        expect(foundPokemon).toEqual(null);
    });
});

describe("DeletePokemons", () => {
    it("shoud be able to delete a pokemon", async () => {
        const inMemoryPokemonsRepository = new InMemoryPokemonsRepository();
        const pokemon = new Pokemon(inMemoryPokemonsRepository);
        const newPokemon = {
            tipo: "charizard",
            treinador: "junin",
        } as CreatePokemonsRequest;

        const createdPokemon = await pokemon.create(newPokemon);
        await pokemon.delete({ id: createdPokemon.id });

        expect(inMemoryPokemonsRepository.pokemons).toEqual([]);
    });

    it("shoud not be able to delete a pokemon", async () => {
        const inMemoryPokemonsRepository = new InMemoryPokemonsRepository();
        const pokemon = new Pokemon(inMemoryPokemonsRepository);
        const newPokemon = {
            tipo: "charizard",
            treinador: "junin",
        } as CreatePokemonsRequest;

        const createdPokemon = await pokemon.create(newPokemon);
        await pokemon.delete({ id: 999999 });

        expect(inMemoryPokemonsRepository.pokemons).toEqual(
            expect.arrayContaining([expect.objectContaining(createdPokemon)])
        );
    });
});

describe("ListPokemons", () => {
    it("shoud be able to list pokemons", async () => {
        const inMemoryPokemonsRepository = new InMemoryPokemonsRepository();
        const pokemon = new Pokemon(inMemoryPokemonsRepository);
        const newPokemon = {
            tipo: "charizard",
            treinador: "junin",
        } as CreatePokemonsRequest;

        await pokemon.create(newPokemon);
        const createdPokemon = await pokemon.create(newPokemon);
        await pokemon.create(newPokemon);
        await pokemon.create(newPokemon);

        expect(inMemoryPokemonsRepository.pokemons).toHaveLength(4);
        expect(inMemoryPokemonsRepository.pokemons).toEqual(
            expect.arrayContaining([expect.objectContaining(createdPokemon)])
        );
    });
});

describe("BattlePokemons", () => {
    it("should be able to perform a pokemon battle", async () => {
        const inMemoryPokemonsRepository = new InMemoryPokemonsRepository();
        const pokemon = new Pokemon(inMemoryPokemonsRepository);

        const pokemon1Data = {
            tipo: "charizard",
            treinador: "ash",
        } as CreatePokemonsRequest;

        const pokemon2Data = {
            tipo: "pikachu",
            treinador: "misty",
        } as CreatePokemonsRequest;

        const pokemon1 = await pokemon.create(pokemon1Data);
        const pokemon2 = await pokemon.create(pokemon2Data);

        const battleResult = await pokemon.battle({ id1: pokemon1.id, id2: pokemon2.id });

        expect(battleResult.winner).toBeDefined();
        expect(battleResult.loser).toBeDefined();

        const loserExists = await pokemon.get({ id: battleResult.loser.id});
        expect(loserExists).toBeNull();
    });
});