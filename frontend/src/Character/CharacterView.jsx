import { useEffect, useState } from "react";
import { useParams } from 'react-router';
<<<<<<< HEAD
import {classToPng, raceToPng} from './CharacterImages';
=======
import {classToPng, raceToPng} from './CharacterImages'
>>>>>>> 5226ef81242f412659a083c978dec379f8aa6532
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
        fetch(`http://localhost:8080/character/${id}`, requestInfo)
            .then(response => response.json())
            .then(json => updateCharacter(json));
    }, []);

    return (character) ? (
        <>
            <h1>{character.characterName}</h1>
            <div className="wrapper">
                <span className="classRace">
                    <div>
                        <img src={raceToPng(character.race)} alt={character.race}/>
                        <h3>Race: {character.race}</h3>
                    </div>
                    <div>
                        <img src={classToPng(character.characterClass)} alt={character.characterClass}/>
                        <h3>Class: {character.characterClass}</h3>
                    </div>
                </span>
                <span className="attributes">
                    <div>
<<<<<<< HEAD
                        <h3>Attributes</h3>
                        <span>
                            <p>STR: {character.strength}</p>
                            <p>CON: {character.constitution}</p>
                            <p>INT: {character.intelligence}</p>
                        </span>
                        <span>
                            <p>WIS: {character.wisdom}</p>
                            <p>DEX: {character.dexterity}</p>
                            <p>CHA: {character.charisma}</p>
                        </span>
                    </div>
                </span>
                <span className="personalityfandt">
                    <div>
                        <h3>Personality</h3>
                        <p>{character.personality}</p>
                    </div>
                    <div>
                        <h3>Feats & Traits</h3>
                        <p>{character.featAndTraits}</p>
                    </div>
                </span>
                <span className="backalign">
                    <div>
                        <p><b>Background:</b> {character.background}</p>
                    </div>
                    <div>
                        <p><b>Alignment:</b> {character.alignment}</p>
                    </div>
                </span>
                <span className="idealbondflaw">
                    <div>
                        <h3>Ideals</h3>
                        <p>{character.ideals}</p>
                    </div>
                    <div>
                        <h3>Bonds</h3>
                        <p>{character.bonds}</p>
                    </div>
                    <div>
                        <h3>Flaws</h3>
                        <p>{character.flaws}</p>
=======
                        <div>
                            <span>STR: {character.strength}</span>
                            <span>CON: {character.constitution}</span>
                        </div>
                        <div>
                            <span>INT: {character.intelligence}</span>
                            <span>WIS: {character.wisdom}</span>
                        </div>
                        <div>
                            <span>DEX: {character.dexterity}</span>
                            <span>CHA: {character.charisma}</span>
                        </div>
>>>>>>> 5226ef81242f412659a083c978dec379f8aa6532
                    </div>
                </span>
                <span className="personalityfandt">
                    <div>
                        <h3>Personality</h3>
                        <p>{character.personality}</p>
                    </div>
                    <div>
                        <h3>Feats & Traits</h3>
                        <p>{character.featAndTraits}</p>
                    </div>
                </span>
                <span className="backalign">
                    <div>
                        <p><b>Background:</b> {character.background}</p>
                    </div>
                    <div>
                        <p><b>Alignment:</b> {character.alignment}</p>
                    </div>
                </span>
                <span className="idealbondflaw">
                    <div>
                        <h3>Ideals</h3>
                        <p>{character.ideals}</p>
                    </div>
                    <div>
                        <h3>Bonds</h3>
                        <p>{character.bonds}</p>
                    </div>
                    <div>
                        <h3>Flaws</h3>
                        <p>{character.flaws}</p>
                    </div>
                </span>
            </div>
        </>
    ) : (
        <div>Loading</div>
    )
}