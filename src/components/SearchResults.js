import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CONFIG from '../config.js';
import "./css/SearchResults.min.css";

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            query: this.props.match.params.query,
            searchError: false,
            totalPages: 1,
            page: 1
        }
    }

    componentDidMount() {
        this.setState({query: this.props.match.params.query});
        if(this.props.query !== "") {
            this.getResults(this.state.query);
        }
    }

    getResults(query) {
        fetch(`http://www.omdbapi.com/?page=${this.state.page}&s=${query}${CONFIG.apiKey}`)
            .then(response => response.json())
            .then(data => {
                this.setState({results: data.Search, totalPages: data.totalResults, searchError: false});
            })
            .catch(error => {
                console.error("Error:", error);
                this.setState({searchError: true});
            });
    }

    render() {
        if(this.state.searchError) {
            return <div className="ui header">There was an error with your search...</div>
        } else if(this.state.query === "") {
            return <div className="ui header">Use the searchbar to find a movie</div>
        }else if(this.state.results === undefined) {
            return <div className="ui header">Your search did not return any results. Try another query.</div>
        } else {
            return (
                <div>
                    {
                        this.state.results.map((result, index) => {
                            const link = `/movie/${result.imdbID}`;
                            return (
                                <Link to={link} className="result" key={index}>
                                    <img className="ui tiny image poster" src={result.Poster} alt=""/>
                                    <div className="title">{`${result.Title} (${result.Year})`}</div>
                                </Link>
                            )
                        })
                    }
                </div>
            )
        }
    }
}

export default SearchResults;
