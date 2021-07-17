import React, {useEffect, useState} from 'react';
import add from './icons/adddark.png';
import none from './icons/nonedark.png';
import barbarian from './icons/barbariandark.png'
import bard from './icons/barddark.png'
import cleric from './icons/clericdark.png'
import druid from './icons/druiddark.png'
import fighter from './icons/fighterdark.png'
import monk from './icons/monkdark.png';
import paladin from './icons/paladindark.png'
import ranger from './icons/rangerdark.png'
import rogue from './icons/roguedark.png'
import sorcerer from './icons/sorcererdark.png';
import warlock from './icons/warlockdark.png';
import wizard from './icons/wizarddark.png';
import { Link, Redirect } from 'react-router-dom';
import './Form/CharacterList.css';

export default function CharList({user, onCreate }){
    const [characters, updateCharacters] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/character', {method: 'GET', credentials: 'include'})
        .then(response => response.json())
        .then(json => updateCharacters(json))
        console.log(characters)
    }, [])

    function classToPng(className) {
        console.log(className)
        if (className === "Barbarian") {
            return barbarian;
        } else if (className === "Bard"){
            return bard;
        } else if (className === "Cleric"){
            return cleric;        
        } else if (className === "Druid"){
            return druid;        
        } else if (className === "Fighter"){
            return fighter;        
        } else if (className === "Monk"){
            return monk;
        } else if (className === "Paladin"){
            return paladin;        
        } else if (className === "Ranger"){
            return ranger;        
        } else if (className === "Rogue"){
            return rogue;        
        } else if (className === "Sorcerer"){
            return sorcerer;
        } else if (className === "Warlock"){
            return warlock;        
        } else if (className === "Wizard"){
            return wizard;        
        }
    }

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