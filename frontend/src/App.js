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
    const [currentCharacter, updateCurrentCharacter] = useState(null)

    useEffect(() => {
        async function getUser() {
            const url = process.env.NODE_ENV === 'production'
                ? '/user/auth'
                : 'http://localhost:8080/api/user/auth'

            const response = await fetch(url, { method: 'GET', credentials: 'include' });
            const json = await response.json();
            if (json) {
                updateUser(json);
            }
        }
        getUser();
    }, [])

    const handleGetStarted = () => {
        if (user) {
            updateCharacterFormVisibility(true)
        } else {
            updateRegisterFormVisibility(true)
        }
    }

    const handleEdit = (character) => () => {
        updateCurrentCharacter(character)
        updateCharacterFormVisibility(true)
    }

    const handleDelete = () => {
        updateCurrentCharacter(null)
    }

    return (
        <div className="app">
            <LoginForm visible={loginFormVisible} onClose={() => updateLoginFormVisibility(false)} updateUser={updateUser}/>
            <RegisterForm visible={registerFormVisible} onClose={() => updateRegisterFormVisibility(false)} updateUser={updateUser}/>
            <BrowserRouter>
                <CharacterForm
                    character={currentCharacter}
                    visible={characterFormVisible}
                    onClose={() => updateCharacterFormVisibility(false)}
                    onChange={c => updateCurrentCharacter(c)} />
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
                        <Characters currentCharacter={currentCharacter} user={user} onCreate={() => updateCharacterFormVisibility(true)} />
                    </Route>
                    <Route path="/character/:id">
                        <CharacterView currentCharacter={currentCharacter} onChange={c => updateCurrentCharacter(c)} onDelete={handleDelete} onEdit={handleEdit}/>
                    </Route>
                    <Route path="/logout">
                        <Logout updateUser={updateUser}/>
                    </Route>
                    <Route path="/">
                        <Home onStart={handleGetStarted} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
)
}
