import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import Landing from './components/Landing';
import SearchResults from './components/SearchResults';
import MoviePage from './components/MoviePage';

class App extends Component {

  render() {
    return (
      <div className="App">
          <Menu onSearch={(query) => this.getQuery(query)} />
          <main>
              <Route exact path="/" component={Landing} />
              <Route path="/search/:query" component={SearchResults} />
              <Route path="/movie/:id" component={MoviePage} />
          </main>
      </div>
    );
  }
}

export default App;
