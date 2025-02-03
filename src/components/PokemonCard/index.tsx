import { Component } from 'react';

import { Pokemon } from '../../types';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export class PokemonCard extends Component<PokemonCardProps> {
  render() {
    const { pokemon } = this.props;

    return (
      <div className="pokemon-card">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <div className="types">
          {pokemon.types.map((type) => (
            <span key={type.type.name} className={`type ${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="stats">
          {pokemon.stats.slice(0, 3).map((stat) => (
            <div key={stat.stat.name} className="stat">
              <span>{stat.stat.name}:</span>
              <span>{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
