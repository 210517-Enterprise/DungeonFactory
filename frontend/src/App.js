import './App.css';

import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './Home/Home'
import Login from './User/Login'
import Logout from './User/Logout'
import Register from './User/Register'
import Characters from './Character/CharacterList'
import React from 'react';
<<<<<<< HEAD
import D20 from './D20.gif'
=======
import CharacterList from './Character/CharList';
>>>>>>> Added new CharList

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
        let links = []

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
                    <div class="navbar">
                        <div class="left-nav">

                            <Link to="/">  <img src={D20} alt="tinylogo"/> </Link>

                        </div>
                        
                        
                        <div class= "right-nav">
                            {links.map(link => <li key={link.to}><Link to={link.to}>{link.label}</Link></li>)}
                        </div>
                    </div>
                    <Switch>
                        <Route path="/login">
                            <Login currentUser={this.state.currentUser} onLogin={this.handleLogin}/>
                        </Route>
                        <Route path="/register">
                            <Register currentUser={this.state.currentUser} onLogin={this.handleLogin}/>
                        </Route>
                        <Route path="/characters">
                            <Characters user={this.state.currentUser}/>
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
