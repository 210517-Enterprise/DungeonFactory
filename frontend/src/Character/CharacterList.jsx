import React, {useEffect, useState} from 'react'



export default function CharList({user}){
    const [characters, updateCharacters] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/character/mychars', {method: 'GET', credentials: 'include'})
        .then(response => response.json())
        .then(json => updateCharacters(json))
    }, [])

    return (
        <>
            <h1>Characters</h1>
            <ul>
                <li>Create new character</li>
                {characters.map(character => (
                    <li key= {character.id}>
                        <h3>{character.race}</h3> 
                    </li>
                ))}
            </ul>
        </>
    )
}