import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router';
import styled from "styled-components";
import {classToPng, raceToPng} from './CharacterImages';
// Css
import './CharacterView.css';
import {Button} from "../UI/Button";

const ButtonContainer = styled.div``

export default function CharacterView({ onEdit, onDelete, currentCharacter, onChange }) {
    const { id } = useParams();
    const history = useHistory()

    useEffect(() => {
        const requestInfo = {
            method: 'GET',
            credentials: 'include'
        };
        fetch(`http://localhost:8080/character/${id}`, requestInfo)
            .then(response => response.json())
            .then(json => onChange(json));
    }, []);

    async function deleteCharacter(id) {
        try {
            const requestInfo = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            };

            const response = await fetch('http://localhost:8080/character/' + id, requestInfo)
            if (response.status == 200) {
            }
        } catch (e) {
            console.log("An unexpected error occured: " + e)
        }
    }

    const handleDelete = async () => {
        const choice = window.confirm("Do you really want to delete this character?")
        if (choice) {
            await deleteCharacter(currentCharacter.id)
            history.push("/character/list")
            onDelete()
        }
    }

    return (currentCharacter) ? (
        <>
            <h1>{currentCharacter.characterName}</h1>
            <div className="wrapper">
                <span className="classRace">
                    <div>
                        <img src={raceToPng(currentCharacter.race)} alt={currentCharacter.race}/>
                        <h3>Race: {currentCharacter.race}</h3>
                    </div>
                    <div>
                        <img src={classToPng(currentCharacter.characterClass)} alt={currentCharacter.characterClass}/>
                        <h3>Class: {currentCharacter.characterClass}</h3>
                    </div>
                </span>
                <span className="attributes">
                    <div>
                        <h3>Attributes</h3>
                        <span>
                            <p>STR: {currentCharacter.strength}</p>
                            <p>CON: {currentCharacter.constitution}</p>
                            <p>INT: {currentCharacter.intelligence}</p>
                        </span>
                        <span>
                            <p>WIS: {currentCharacter.wisdom}</p>
                            <p>DEX: {currentCharacter.dexterity}</p>
                            <p>CHA: {currentCharacter.charisma}</p>
                        </span>
                    </div>
                </span>
                <span className="personalityfandt">
                    <div>
                        <h3>Personality</h3>
                        <p>{currentCharacter.personality}</p>
                    </div>
                    <div>
                        <h3>Feats & Traits</h3>
                        <p>{currentCharacter.featAndTraits}</p>
                    </div>
                </span>
                <span className="backalign">
                    <div>
                        <p><b>Background:</b> {currentCharacter.background}</p>
                    </div>
                    <div>
                        <p><b>Alignment:</b> {currentCharacter.alignment}</p>
                    </div>
                </span>
                <span className="idealbondflaw">
                    <div>
                        <h3>Ideals</h3>
                        <p>{currentCharacter.ideals}</p>
                    </div>
                    <div>
                        <h3>Bonds</h3>
                        <p>{currentCharacter.bonds}</p>
                    </div>
                    <div>
                        <h3>Flaws</h3>
                        <p>{currentCharacter.flaws}</p>
                    </div>
                </span>
                <span>
                    <ButtonContainer>
                        <Button background="#7D94A4" onClick={onEdit(currentCharacter)}>Edit</Button>
                        <Button background="#CD5555" onClick={handleDelete}>Delete</Button>
                    </ButtonContainer>
                </span>
            </div>
        </>
    ) : (
        <div>Loading</div>
    )
}