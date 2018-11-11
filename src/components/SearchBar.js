import React, { Component } from 'react';
import SearchResults from './SearchResults';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            sentQuery: "",
            resultsOpen: false
        };
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (e) => {
        if(this.node.contains(e.target)) {
            return;
        }
        this.clearQuery();
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    handleSearchClick() {
        let query = this.state.query;
        if(query !== "") {
            this.setState({query: "", sentQuery: query, resultsOpen: true});
        }
    }

    clearQuery() {
        this.setState({sentQuery: "", resultsOpen: false});
    }

    render() {
        let searchButton;
        if(this.state.resultsOpen) {
            searchButton = <button onClick={() => this.clearQuery()} className="ui basic icon button"><i className="icon close" /></button>
        } else {
            searchButton = <button onClick={() => this.handleSearchClick()} className="ui basic icon button"><i className="icon search" /></button>
        }
        return (
            <div className="ui transparent icon input">
                <input className="prompt" type="text" value={this.state.query} onChange={(e) => this.handleChange(e)} placeholder="Search..." />
                {searchButton}
                <div ref={node => this.node = node}><SearchResults query={this.state.sentQuery} clearQuery={() => this.clearQuery()}/></div>
            </div>
        )
    }
}

export default SearchBar;
