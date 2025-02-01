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
            <PokemonList />
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
