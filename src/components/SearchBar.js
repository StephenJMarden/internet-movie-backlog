import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        };
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSearch(this.state.query);
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="ui icon input">
                    <input type="text" value={this.state.query} onChange={(e) => this.handleChange(e)} placeholder="Search..." />
                    <i className="search icon"></i>
                </div>
                <button type="submit" className="ui button blue">Search</button>
            </form>
        )
    }
}

export default SearchBar;
