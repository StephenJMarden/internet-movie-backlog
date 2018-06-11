import React, { Component } from 'react';
import CONFIG from '../config.js';
import { Link } from 'react-router-dom';
import "./css/Landing.min.css";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestMovies: []
        }
    }

    componentWillMount() {
        this.fetchLatestMovies();
    }

    fetchLatestMovies() {
        fetch(`http://www.omdbapi.com/?s=John${CONFIG.apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({latestMovies: data.Search});
            })
    }

    render() {
        const latestMovies = this.state.latestMovies;

        return (
            <div className="landing">
                <h1 className="ui block header">Internet Movie Backlog
                    <div className="sub header">
                        <i className="power off icon"></i>
                        Powered by <a href="http://www.omdbapi.com/">Open Movie Database API</a> by <a href="https://www.patreon.com/bePatron?u=5038490">Brian Fritz</a>
                    </div>
                </h1>

                <h2 className="ui header">Popular Movies</h2>
                <div className="popular-movies ui three stackable cards">
                    {
                        latestMovies.map((movie, index) => {
                            const link = `movie/${movie.imdbID}`;
                            if(index < 9) return (
                                <Link to={link} key={index} className="ui card">
                                    <div className="ui image"><img src={movie.Poster} alt="Error" /></div>
                                    <div className="content">
                                        <div className="header tiny left floated">{movie.Title}</div>
                                    </div>
                                    <div className="extra content">
                                        <div className="left floated">{movie.Year}</div>
                                    </div>
                                </Link>
                            )
                            return false;
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Landing;
