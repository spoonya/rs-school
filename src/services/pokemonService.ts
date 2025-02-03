import axios from 'axios';

import { Pokemon, PokemonStat, PokemonType } from '../types';

export class PokemonService {
  private readonly BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

  private readonly transformToPokemon = (data: Pokemon): Pokemon => ({
    id: data.id,
    name: data.name,
    sprites: {
      front_default: data.sprites.front_default,
    },
    types: data.types.map((type: PokemonType) => ({
      type: { name: type.type.name },
    })),
    stats: data.stats.map((stat: PokemonStat) => ({
      base_stat: stat.base_stat,
      stat: { name: stat.stat.name },
    })),
  });

  async searchPokemon(search: string): Promise<Pokemon[]> {
    try {
      if (search.trim()) {
        const { data } = await axios.get(
          `${this.BASE_URL}/${search.trim().toLowerCase()}`
        );
        return [this.transformToPokemon(data)];
      }

      const { data: listData } = await axios.get(`${this.BASE_URL}?limit=20`);
      const results = await Promise.all(
        listData.results.map(async (item: { url: string }) => {
          try {
            const { data: pokemonData } = await axios.get(item.url);
            return this.transformToPokemon(pokemonData);
          } catch {
            return null;
          }
        })
      );

      return results.filter((p) => p !== null) as Pokemon[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.status === 404
            ? 'Pokemon not found'
            : `Failed to fetch: ${error.message}`
        );
      }
      throw error;
    }
  }
}

export const pokemonService = new PokemonService();
