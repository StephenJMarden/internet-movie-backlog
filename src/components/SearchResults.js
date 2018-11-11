import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CONFIG from '../config.js';
import "./css/SearchResults.min.css";

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            searchError: false,
            totalPages: 1,
            page: 1
        }
    }

    componentDidMount() {
        console.log(this.props.query);
        if(this.props.query !== "") {
            this.getResults(this.props.query);
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.query !== prevProps.query && this.props.query !== "") {
            this.getResults(this.props.query);
        }
    }

    getResults(query) {
        fetch(`http://www.omdbapi.com/?page=${this.state.page}&s=${query}${CONFIG.apiKey}`)
            .then(response => response.json())
            .then(data => {
                this.setState({results: data.Search, totalPages: data.totalResults, searchError: false});
                console.log(data);
            })
            .catch(error => {
                console.error("Error:", error);
                this.setState({searchError: true});
            });
    }

    closeResults() {
        this.setState({results: []});
        this.props.clearQuery();
    }

    render() {

        if(this.state.searchError) {
            return (
                <div className="ui list">
                    <div className="item">There was an error with your search...</div>
                </div>
            )
        }else if(this.props.query === "" || this.state.results.length === 0) {
            return (
                <div></div>
            )
        }else if(this.state.results === undefined) {
            return (
                <div className="ui list">
                    <div className="item">Your search did not return any results. Try another query.</div>
                </div>
            )
        } else {
            return (
                <div className="custom-results">
                    <div className="ui middle aligned selection list">
                        {
                            this.state.results.map((result, index) => {
                                const link = `/movie/${result.imdbID}`;
                                return (
                                    <Link onClick={() => this.closeResults()} to={link} className="item" key={index}>
                                        <img className="ui mini image" src={result.Poster} alt=""/>
                                        <div className="content">
                                            <div className="header">{`${result.Title} (${result.Year})`}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}

export default SearchResults;
