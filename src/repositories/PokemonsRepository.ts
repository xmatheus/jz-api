type PokemonType = "charizard" | "mewtwo" | "pikachu";

export interface CreatePokemonsData {
  tipo: PokemonType;
  treinador: string;
}

export interface UpdatePokemonsData {
  id: number;
  treinador: string;
  nivel?: number;
}

export interface GetPokemonsData {
  id: number;
}

export interface DeletePokemons {
  id: number;
}

export interface PokemonsDataOutput {
  tipo: PokemonType;
  treinador: string;
  id: number,
  nivel: number
}

export interface PokemonsRepository {
    create(data: CreatePokemonsData): Promise<PokemonsDataOutput>
    update(data: UpdatePokemonsData): Promise<void>
    get(data: GetPokemonsData): Promise<PokemonsDataOutput | null>
    delete(data: DeletePokemons): Promise<void>
    list(): Promise<PokemonsDataOutput[]>,
}
