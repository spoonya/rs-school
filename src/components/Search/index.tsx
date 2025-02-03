import { Component } from 'react';

interface SearchProps {
  initialValue: string;
  onSearch: (term: string) => void;
}

interface SearchState {
  searchTerm: string;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: props.initialValue,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    const processedTerm = this.state.searchTerm.trim();
    this.props.onSearch(processedTerm);
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          placeholder="Search Pokemon..."
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}
