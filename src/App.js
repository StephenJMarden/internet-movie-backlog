import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import SearchResults from './components/SearchResults';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          searchQuery: ""
      }
  }

  getQuery(query) {
      this.setState({searchQuery: query});
  }

  render() {
    return (
      <div className="App">
          <Menu onSearch={(query) => this.getQuery(query)} />
          <main>
              <Route exact path="/" render={() => <SearchResults query={this.state.searchQuery} />} />
          </main>
      </div>
    );
  }
}

export default App;
