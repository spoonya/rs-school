import { useEffect, useState } from 'react';

import { pokemonService } from '../services/pokemonService';
import { Pokemon } from '../types';

export const usePokemonSearch = (initialSearch: string) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = async (search: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await pokemonService.searchPokemon(search);
      setPokemons(results);
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : 'Failed to fetch Pokemon'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    const processedTerm = term.trim();
    localStorage.setItem('pokemonSearch', processedTerm);
    setSearchTerm(processedTerm);
  };

  useEffect(() => {
    fetchPokemons(searchTerm);
  }, [searchTerm]);

  return {
    searchTerm,
    pokemons,
    isLoading,
    error,
    handleSearch,
  };
};
