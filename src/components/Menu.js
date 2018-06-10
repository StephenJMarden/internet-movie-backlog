import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <header className="ui menu">
                <Link className="header item" to="/">IMBL</Link>
                <div className="right menu">
                    <SearchBar onSearch={(query) => this.props.onSearch(query)} />
                </div>
            </header>
        )
    }
}

export default Menu;
