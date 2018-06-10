import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    createUrlQuery(query) {
        return query.split(" ").join("+");
    }

    handleSearchClick() {
        this.setState({query: ""});
    }

    render() {
        const query = this.createUrlQuery(this.state.query);

        return (
            <form>
                <div className="ui input">
                    <input type="text" value={this.state.query} onChange={(e) => this.handleChange(e)} placeholder="Search..." />
                </div>
                <Link onClick={() => this.handleSearchClick()} to={`/search/${query}`} ><button type="submit" className="ui icon button primary"><i className="icon search"></i></button></Link>
            </form>
        )
    }
}

export default SearchBar;
