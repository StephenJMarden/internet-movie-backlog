import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import SignIn from './SignIn';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <header className="ui secondary pointing menu">
                <Link className="header item" to="/">IMBL</Link>
                <Link className="item" to="/lists">My Backlog</Link>
                <div className="right menu">
                    <div className="item">
                        <SearchBar />
                    </div>
                    <div className="item">
                        <SignIn
                            firebase = {this.props.firebase}
                            activeUser = {this.props.activeUser}
                            setUser = {this.props.setUser}
                        />
                    </div>
                </div>
            </header>
        )
    }
}

export default Menu;
