import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import Menu from './components/Menu';
import Landing from './components/Landing';
import MoviePage from './components/MoviePage';
import Lists from './components/Lists';

//Initialize Firebase
var config = {
  apiKey: "AIzaSyB31dkDCvffxuxBpZuf1Y5PkVsI1NGbrBc",
  authDomain: "imbl-7cbd8.firebaseapp.com",
  databaseURL: "https://imbl-7cbd8.firebaseio.com",
  projectId: "imbl-7cbd8",
  storageBucket: "imbl-7cbd8.appspot.com",
  messagingSenderId: "34393430865"
};
firebase.initializeApp(config);

const fakeDatabase = {
    backlog: [
        {
            Poster: "https://ia.media-imdb.com/images/M/MV5BODdlMjU0MDYtMWQ1NC00YjFjLTgxMDQtNDYxNTg2ZjJjZDFiXkEyXkFqcGdeQXVyMTU2NTcxNDg@._V1_SX300.jpg",
            Title: "Beta Test",
            Type: "movie",
            Year: "2016",
            imdbID: "tt4244162",
            Runtime: 88,
            Watched: false
        }, {
            Poster: "https://m.media-amazon.com/images/M/MV5BYzc3OGZjYWQtZGFkMy00YTNlLWE5NDYtMTRkNTNjODc2MjllXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg",
            Title: "Johnny Test",
            Type: "series",
            Year: "2005–2014",
            imdbID: "tt0454349",
            Runtime: 30,
            Watched: false
        }, {
            Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMzMDQwMzM2M15BMl5BanBnXkFtZTcwMzA1OTg1OQ@@._V1_SX300.jpg",
            Title: "The Test",
            Type: "movie",
            Year: "2013",
            imdbID: "tt2616114",
            Runtime: 89,
            Watched: false
        }
    ]
}

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          activeUser: {},
          backlog: {}
      }

  }

  componentWillMount() {
      this.updateBacklog();
  }

  setUser(user) {
      this.setState({activeUser: user});
  }

  updateBacklog() {
      this.setState({backlog: fakeDatabase.backlog});
  }

  addToBacklog(item) {
      if(this.isOnBacklog(item) === false) {
          fakeDatabase.backlog.push(item);
          this.updateBacklog();
      }
  }

  removeFromBacklog(item) {
      if(this.isOnBacklog(item)) {
          fakeDatabase.backlog.splice(this._findPositionOnBacklog(item), 1);
          this.updateBacklog();
      }
  }

  isOnBacklog(newItem) {
      let onBacklog = false;
      this.state.backlog.forEach((item) => {
          if(item.imdbID === newItem.imdbID) {
              onBacklog = true;
              return;
          }
      });
      return onBacklog;
  }

  _findPositionOnBacklog(item) {
      for(let i = 0; i < this.state.backlog.length; i++) {
          if(this.state.backlog[i].imdbID === item.imdbID) return i;
      }
  }

  reorderBacklog(item, direction) {
      const swap = (first, second) => {
          let temp = fakeDatabase.backlog[first];
          fakeDatabase.backlog[first] = fakeDatabase.backlog[second];
          fakeDatabase.backlog[second] = temp;
      }

      const curPosition = this._findPositionOnBacklog(item);
      const newPosition = curPosition + direction;

      if(newPosition >= 0 && newPosition < this.state.backlog.length) {
          swap(curPosition, newPosition);
          this.updateBacklog();
      }
  }

  toggleWatched(item) {
      if(this.isOnBacklog(item)) {
          const position = this._findPositionOnBacklog(item);
          fakeDatabase.backlog[position].Watched = !fakeDatabase.backlog[position].Watched;
          this.updateBacklog();
      }
  }

  render() {
    return (
      <div className="App">
          <Menu
              firebase = {firebase}
              activeUser = {this.state.activeUser}
              setUser = {(user) => this.setUser(user)}
          />
          <main>
              <Route exact path="/" render={(props) => (
                      <Landing
                          activeUser = {this.state.activeUser}
                      />
                  )} />
              <Route path="/movie/:id" render = {(props, match) => (
                      <MoviePage
                          {...props}
                          activeUser = {this.state.activeUser}
                          addToBacklog = {(item) => this.addToBacklog(item)}
                          removeFromBacklog = {(item) => this.removeFromBacklog(item)}
                          isOnBacklog = {(item) => this.isOnBacklog(item)}
                      />
                  )} />
              <Route exact path="/lists" render = {(props) => (
                      <Lists
                          {...props}
                          activeUser = {this.state.activeUser}
                          reorderBacklog = {(item, direction) => this.reorderBacklog(item, direction)}
                          removeFromBacklog = {(item) => this.removeFromBacklog(item)}
                          toggleWatched = {(item) => this.toggleWatched(item)}
                      />
                  )} />
          </main>
      </div>
    );
  }
}

export default App;
