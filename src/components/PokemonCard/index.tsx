import { Component } from 'react';

interface PokemonCardProps {
  name: string;
  url: string;
}

export class PokemonCard extends Component<PokemonCardProps> {
  render() {
    return (
      <div className="pokemon-card">
        <h3 className="pokemon-name">{this.props.name}</h3>
        <p className="pokemon-url">{this.props.url}</p>
      </div>
    );
  }
}
