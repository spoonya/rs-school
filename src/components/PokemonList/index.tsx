import { Component } from 'react';

import { Pokemon } from '../../types';
import { PokemonCard } from '../PokemonCard';

interface PokemonListProps {
  pokemons: Pokemon[];
}

export class PokemonList extends Component<PokemonListProps> {
  render() {
    return (
      <div className="pokemon-list">
        {this.props.pokemons.length > 0 ? (
          this.props.pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))
        ) : (
          <div className="no-results">No Pokemon found</div>
        )}
      </div>
    );
  }
}
