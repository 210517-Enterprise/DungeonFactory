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
import React, { useEffect, useState } from 'react';

export default function App() {
    const [user, updateUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            let response = await fetch('http://localhost:8080/user/auth', { method: 'GET', credentials: 'include' });
            let json = await response.json();
            if (json) {
                updateUser(json);
            }
        }
        getUser();
    }, [])

    let links = []

    if (user) {
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
                        <Link to="/">Home</Link>
                    </div>
                    
                    <div class= "right-nav">
                        {links.map(link => <li key={link.to}><Link to={link.to}>{link.label}</Link></li>)}
                    </div>
                </div>
                <Switch>
                    <Route path="/login">
                        <Login user={user} updateUser={updateUser}/>
                    </Route>
                    <Route path="/register">
                        <Register user={user} updateUser={updateUser}/>
                    </Route>
                    <Route path="/characters">
                        <Characters user={user}/>
                    </Route>
                    <Route path="/logout">
                        <Logout updateUser={updateUser}/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}