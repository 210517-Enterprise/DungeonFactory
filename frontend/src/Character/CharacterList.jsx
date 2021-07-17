import React, {useEffect, useState} from 'react';
import add from './icons/adddark.png';
import none from './icons/nonedark.png';
import {classToPng} from './CharacterImages';
import { Link, Redirect } from 'react-router-dom';
import './Form/CharacterList.css';

export default function CharList({user, onCreate }){
    const [characters, updateCharacters] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/character', {method: 'GET', credentials: 'include'})
        .then(response => response.json())
        .then(json => updateCharacters(json))
    }, [])

    return (user) ? (
        <>
            <h1>Characters</h1>   
            <span> 
                <div class="card" onClick={onCreate}>
                    <img src={add} alt="Add a new character"/>
                    <div class="container">
                        <h4><b>Create a character</b></h4>
                    </div>
                </div>

                {characters.length !== 0 ?
                    characters.map(character => (
                        <Link to={`/character/${character.id}`}>
                            <div class="card">
                                <img src={classToPng(character.characterClass)} alt={character.characterClass}/>
                                <div class="container">
                                    <h4><b>{character.characterName}</b></h4>
                                </div>
                            </div> 
                        </Link> ))
                    :
                    <div class="card">
                        <img src={none} alt="X"/>
                        <div class="container">
                            <h4><b>You have no characters</b></h4>
                        </div>
                    </div> 
                }
            </span>   
        </>
    ) : (
        <div><Redirect to="../"/></div>
    )
}