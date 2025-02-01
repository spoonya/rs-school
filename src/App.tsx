import { Component } from 'react';

import { PokemonList, Search } from './components';
import { Pokemon, PokemonStat, PokemonType } from './types';

interface AppState {
  searchTerm: string;
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  shouldThrowError: boolean;
}

class App extends Component<object, AppState> {
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
      if (search.trim()) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${search.trim().toLowerCase()}`
        );

        if (!response.ok)
          throw new Error(`Pokemon not found (${response.status})`);

        const data = await response.json();
        this.setState({
          pokemons: [this.transformToPokemon(data)],
          isLoading: false,
        });
      } else {
        const listResponse = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=20'
        );
        if (!listResponse.ok)
          throw new Error(`Can't fetch list (${listResponse.status})`);

        const listData = await listResponse.json();
        const results = await Promise.all(
          listData.results.map(async (item: { url: string }) => {
            const response = await fetch(item.url);
            if (!response.ok) return null;
            return this.transformToPokemon(await response.json());
          })
        );

        this.setState({
          pokemons: results.filter((p) => p !== null) as Pokemon[],
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      this.setState({
        error:
          error instanceof Error ? error.message : 'Failed to fetch Pokemon',
        isLoading: false,
      });
    }
  };

  transformToPokemon = (data: Pokemon): Pokemon => ({
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

  private renderMainContent() {
    if (this.state.isLoading) {
      return <div className="loader">Loading Pokemon...</div>;
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

export default App;
