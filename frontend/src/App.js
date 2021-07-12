import './App.css';

import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './Home'
import Login from './User/Login'
import Logout from './User/Logout'
import Register from './User/Register'
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {currentUser: null};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleLogin(user) {
        this.setState({currentUser: user});
    }

    handleLogout() {
        this.setState({currentUser: null});
    }

    async componentDidMount() {
        let response = await fetch('http://localhost:8080/user/auth')

        try {
            this.setState({currentUser: await response.json()});
        } catch(err){
            console.log("No user");
        }
    }

    render() { 
        let links = [
            {
                to: "/",
                label: "Home"
            }
        ]

        if (this.state.currentUser) {
            links.push({
                to: "/characters",
                label: "Characters"
            });
            links.push({
                to: "/logout",
                label: "Logout"
            });
        } else {
            links.push({
                to: "/login",
                label: "Login"
            });
            links.push({
                to: "/register",
                label: "Register"
            });
        }
        
        return (
            <div className="app">
                <BrowserRouter>
                    <div>
                        <ul>
                            {links.map(link => <li key={link.to}><Link to={link.to}>{link.label}</Link></li>)}
                        </ul>
                    </div>
                    <Switch>
                        <Route path="/login">
                            <Login currentUser={this.state.currentUser} onLogin={this.handleLogin}/>
                        </Route>
                        <Route path="/register">
                            <Register currentUser={this.state.currentUser} onLogin={this.handleLogin}/>
                        </Route>
                        <Route path="/logout">
                            <Logout onLogout={this.handleLogout}/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
