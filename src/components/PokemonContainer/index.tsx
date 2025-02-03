import { Component } from 'react';

import { pokemonService } from '../../services/pokemonService';
import { Pokemon } from '../../types';
import { PokemonList } from '../PokemonList';
import { Search } from '../Search';
import { Spinner } from '../Spinner';

interface PokemonContainerState {
  searchTerm: string;
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  shouldThrowError: boolean;
}

export class PokemonContainer extends Component<object, PokemonContainerState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('pokemonSearch') ?? '',
      pokemons: [],
      isLoading: true,
      error: null,
      shouldThrowError: false,
    };
  }

  componentDidMount() {
    this.fetchPokemons(this.state.searchTerm);
  }

  fetchPokemons = async (search: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const results = await pokemonService.searchPokemon(search);
      this.setState({ pokemons: results, isLoading: false });
    } catch (error: unknown) {
      this.setState({
        error:
          error instanceof Error ? error.message : 'Failed to fetch Pokemon',
        isLoading: false,
      });
    }
  };

  handleSearch = (term: string) => {
    const processedTerm = term.trim();
    localStorage.setItem('pokemonSearch', processedTerm);
    this.setState({ searchTerm: processedTerm }, () => {
      this.fetchPokemons(processedTerm);
    });
  };

  throwError = () => {
    this.setState({ shouldThrowError: true });
  };

  renderMainContent() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    if (this.state.error) {
      return <div className="error-message">Error: {this.state.error}</div>;
    }
    return <PokemonList pokemons={this.state.pokemons} />;
  }

  render() {
    if (this.state.shouldThrowError) {
      throw new Error('Test error thrown by button click');
    }

    return (
      <div className="app">
        <div className="top-section">
          <Search
            initialValue={this.state.searchTerm}
            onSearch={this.handleSearch}
          />
        </div>
        <div className="main-section">{this.renderMainContent()}</div>
        <button className="error-button" onClick={this.throwError}>
          Throw Test Error
        </button>
      </div>
    );
  }
}
