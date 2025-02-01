import { Component } from 'react';

import { PokemonCard } from '../PokemonCard';

interface PokemonListProps {
  pokemons: Array<{
    name: string;
    url: string;
  }>;
}

export class PokemonList extends Component<PokemonListProps> {
  render() {
    return (
      <div className="pokemon-list">
        {this.props.pokemons.length > 0 ? (
          this.props.pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))
        ) : (
          <div className="no-results">No Pokemon found</div>
        )}
      </div>
    );
  }
}
