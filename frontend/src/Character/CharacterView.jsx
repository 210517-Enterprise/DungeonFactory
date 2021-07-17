import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import {classToPng, raceToPng} from './CharacterImages';
// Css
import './CharacterView.css';


export default function CharacterView() {
    const [character, updateCharacter] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const requestInfo = {
            method: 'GET',
            credentials: 'include'
        };
        console.log(id)
        fetch(`http://localhost:8080/character/${id}`, requestInfo)
            .then(response => response.json())
            .then(json => updateCharacter(json));
    }, []);

    return (character) ? (
        <>
            <h1>{character.characterName}</h1>
            <div className="wrapper">
                <span className="classRace">
                    <div className="cr">
                        <img src={raceToPng(character.race)} alt={character.race}/>
                        <h3>Race: {character.race}</h3>
                    </div>
                    <div className="cr">
                        <img src={classToPng(character.characterClass)} alt={character.characterClass}/>
                        <h3>Class: {character.characterClass}</h3>
                    </div>
                </span>
                <span className="attributes">
                    <h3 className="attHeader">Attributes</h3>
                    <div>
                        <div>
                            <span>STR: {character.strength}</span>
                            <span>CON: {character.constitution}</span>
                            <span>INT: {character.intelligence}</span>
                        </div>
                        <div>
                            <span>WIS: {character.wisdom}</span>
                            <span>DEX: {character.dexterity}</span>
                            <span>CHA: {character.charisma}</span>
                        </div>
                    </div>
                </span>
            </div>
        </>
    ) : (
        <div>Loading</div>
    )
}