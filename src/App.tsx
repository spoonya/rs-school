import { Component } from 'react';

import { PokemonList, Search } from './components';

interface AppState {
  searchTerm: string;
  pokemons: Array<{ name: string; url: string }>;
  isLoading: boolean;
  error: string | null;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('pokemonSearch') || '',
      pokemons: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchPokemons(this.state.searchTerm);
  }

  fetchPokemons = async (search: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const apiUrl = search
        ? `https://pokeapi.co/api/v2/pokemon/${search.trim().toLowerCase()}`
        : 'https://pokeapi.co/api/v2/pokemon?limit=20';

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const results = data.results ? data.results : [data];

      this.setState({
        pokemons: results.map((p: any) => ({
          name: p.name,
          url: p.url || apiUrl,
        })),
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: error.message || 'Failed to fetch Pokemon',
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
    throw new Error('Test error thrown by button click');
  };

  render() {
    return (
      <div className="app">
        <div className="top-section">
          <Search
            initialValue={this.state.searchTerm}
            onSearch={this.handleSearch}
          />
        </div>

        <div className="main-section">
          {this.state.isLoading ? (
            <div className="loader">Loading Pokemon...</div>
          ) : this.state.error ? (
            <div className="error-message">Error: {this.state.error}</div>
          ) : (
            <PokemonList pokemons={this.state.pokemons} />
          )}
        </div>

        <button className="error-button" onClick={this.throwError}>
          Throw Test Error
        </button>
      </div>
    );
  }
}

export default App;
