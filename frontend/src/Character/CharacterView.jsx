import { useEffect, useState } from "react";
import { useParams } from 'react-router';
// Imported as placeholder for race
import dragonborn from './races/dragonborn.png'
import dwarf from './races/dwarf.png'
import elf from './races/elf.png'
import gnome from './races/gnome.png'
import halfElf from './races/half-elf.png'
import halfOrc from './races/half-orc.png'
import halfling from './races/halfling.png'
import human from './races/human.png'
import tiefling from './races/tiefling.png'
// Class icons
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

    function classToPng(className) {
        if (className === "Barbarian") {
            return barbarian;
        } else if (className === "Bard") {
            return bard;
        } else if (className === "Cleric") {
            return cleric;        
        } else if (className === "Druid") {
            return druid;        
        } else if (className === "Fighter") {
            return fighter;        
        } else if (className === "Monk") {
            return monk;
        } else if (className === "Paladin") {
            return paladin;        
        } else if (className === "Ranger") {
            return ranger;        
        } else if (className === "Rogue") {
            return rogue;        
        } else if (className === "Sorcerer") {
            return sorcerer;
        } else if (className === "Warlock") {
            return warlock;        
        } else if (className === "Wizard") {
            return wizard;        
        }
    }

    function raceToPng(raceName) {
        if (raceName === "Dragonborn"){
            return dragonborn;
        } else if (raceName === "Dwarf") {
            return dwarf;
        } else if (raceName === "Elf") {
            return elf;
        } else if (raceName === "Gnome") {
            return gnome;
        } else if (raceName === "Half-Elf") {
            return halfElf;
        } else if (raceName === "Half-Orc") {
            return halfOrc;
        } else if (raceName === "Halfling") {
            return halfling;
        } else if (raceName === "Human") {
            return human;
        } else if (raceName === "Tiefling") {
            return tiefling;
        }
    }

    return (character) ? (
        <>
            <h1>{character.character_name}</h1>
            <div className="wrapper">
                <span className="classRace">
                    <div className="cr">
                        <img src={raceToPng(character.race)} alt={character.race}/>
                        <h3>Race: {character.race}</h3>
                    </div>
                    <div className="cr">
                        <img src={classToPng(character.character_class)} alt={character.character_class}/>
                        <h3>Class: {character.character_class}</h3>
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