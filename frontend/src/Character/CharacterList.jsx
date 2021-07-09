import React, {useState, useEffect, useReducer} from 'react'

function addCharacter(characters, character){
    characters.value.push(character);
}

export default function CharList({user}){
    const [characters, updateCharacters] = useReducer(addCharacter, []);

    fetch(`http://localhost:8080/character/owner/${user.id}`)
        .then(response => response.json)
        .then(json => json.array.forEach(char => {
            if(!characters)
                updateCharacters(char)
        }));

    return (
        <>
            <h1>Characters</h1>
            <ul>
                <li>Create new character</li>
                {characters.map(character => (
                    <li key= {character.id}>
                        <h3>{character.race}</h3> 
                        <h4>{character.class}</h4>  
                    </li>
                ))}
            </ul>
        </>
    )
}