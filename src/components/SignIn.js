import  React, { Component } from 'react';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    handleSignIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
    }

    handleSignOut() {
        this.props.firebase.auth().signOut();
    }

    render() {
        if(this.props.activeUser) {
            return(
                <button className="ui red button" onClick={() => this.handleSignOut()}>Sign Out</button>
            )
        } else {
            return (
                <button className="ui primary button" onClick={() => this.handleSignIn()}>Sign In</button>
            )
        }
    }
}

export default SignIn;
