import React, { Component } from 'react';
import CONFIG from '../config';
import "./css/MoviePage.min.css";

class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        };
    }

    componentDidMount() {
        fetch(`http://www.omdbapi.com/?i=${this.props.match.params.id}&plot=full${CONFIG.apiKey}`)
            .then(response => response.json())
            .then(data => {
                this.setState({movie: data});
            })
    }

    colorMetascore(score) {
        if(score < 50) return "red";
        if(score < 80) return "yellow";
        return "green";
    }

    render() {
        const metaColor = this.colorMetascore(this.state.movie.Metascore);

        return(
            <div className="movie-page">
                <img src={this.state.movie.Poster} alt="" />
                <h1 className="ui header">{this.state.movie.Title} ({this.state.movie.Year})</h1>
                <div className="basic-info ui four item menu">
                    <span className="item">{this.state.movie.Genre}</span>
                    <span className="item">{this.state.movie.Rated}</span>
                    <span className="item">{this.state.movie.Runtime}</span>
                    <span className="item">{this.state.movie.Released}</span>
                </div>
                <div className="ratings ui two item menu">
                    <span className="item"><strong>Metacritic:</strong><button className={"ui label circular big " + metaColor}>{this.state.movie.Metascore}</button></span>
                    <span className="item"><i className="imdb icon huge"></i>{this.state.movie.imdbRating}</span>
                </div>
                <p>{this.state.movie.Plot}</p>
                <div className="more-info">
                    <div><strong>Director(s):</strong> {this.state.movie.Director}</div>
                    <div><strong>Writer(s):</strong> {this.state.movie.Writer}</div>
                    <div><strong>Starring:</strong> {this.state.movie.Actors}</div>
                </div>
            </div>
        )
    }
}

export default MoviePage;
