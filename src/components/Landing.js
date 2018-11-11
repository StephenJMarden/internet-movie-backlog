import React, { Component } from 'react';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <h1>Landing</h1>
                {
                    this.props.activeUser ? <h2 className="ui header">Welcome, {this.props.activeUser.displayName}</h2> : <h2 className="ui header">Sign in to start creating your backlog!</h2>
                }
            </div>
        )
    }
}

export default Landing;
