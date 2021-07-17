import './App.css';

import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './Home/Home'
import LoginForm from './User/LoginForm'
import Logout from './User/Logout'
import RegisterForm from './User/RegisterForm'
import Characters from './Character/CharacterList'
import CharacterView from './Character/CharacterView';
import React, { useEffect, useState } from 'react';
import CharacterForm from "./Character/Form/CharacterForm";

export default function App() {
    const [user, updateUser] = useState(null);
    const [characterFormVisible, updateCharacterFormVisibility] = useState(false);
    const [loginFormVisible, updateLoginFormVisibility] = useState(false);
    const [registerFormVisible, updateRegisterFormVisibility] = useState(false);

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

    return (
        <div className="app">
            <CharacterForm visible={characterFormVisible} onClose={() => updateCharacterFormVisibility(false)} />
            <LoginForm visible={loginFormVisible} onClose={() => updateLoginFormVisibility(false)} updateUser={updateUser}/>
            <RegisterForm visible={registerFormVisible} onClose={() => updateRegisterFormVisibility(false)} updateUser={updateUser}/>
            <BrowserRouter>
                <div className="navbar">
                    <div className="left-nav">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="right-nav">
                        {user && <Link to="/character/list">Characters</Link>}
                        {user && <Link to="/logout">Logout</Link>}
                        {!user && <Link to="/" onClick={() => updateLoginFormVisibility(true)} >Login</Link>}
                        {!user && <Link to="/" onClick={() => updateRegisterFormVisibility(true)} >Register</Link>}
                    </div>
                </div>
                <Switch>
                    <Route path="/character/list">
                        <Characters user={user} onCreate={() => updateCharacterFormVisibility(true)} />
                    </Route>
                    <Route path="/character/:id">
                        <CharacterView/>
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
