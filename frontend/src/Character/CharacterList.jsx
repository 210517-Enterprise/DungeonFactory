import React, {useEffect, useState} from 'react';
import add from '../Character/icons/add.png';
import none from './icons/none.png';
import monk from './icons/monk.png';
import { Link } from 'react-router-dom';
import './CharacterList.css';



export default function CharList({user, updateCharacterId}){
    const [characters, updateCharacters] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/character', {method: 'GET', credentials: 'include'})
        .then(response => response.json())
        .then(json => updateCharacters(json))
    }, [])

    return (
        <>
            <h1>Characters</h1>   
            <span> 
                <Link to="/CharacterCreator">
                    <div class="card">
                        <img src={add} alt="Add a new character"/>
                        <div class="container">
                            <h4><b>Create a character</b></h4>
                        </div>
                    </div>
                </Link>

                {characters.length !== 0 ?
                    characters.map(character => (
                        <Link to="/CharacterView" onClick={updateCharacterId(character.id)}>
                            <div class="card">
                                <img src={monk} alt="Class"/>
                                <div class="container">
                                    <h4><b>{character.id}</b></h4>
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
    )
}