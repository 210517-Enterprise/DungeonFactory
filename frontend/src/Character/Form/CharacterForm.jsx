import { useState, useEffect } from "react";
import styled from "styled-components";
import CharacterRacePicker from "./CharacterRacePicker";
import CharacterClassPicker from "./CharacterClassPicker";
import CharacterAbilityScorePicker from "./CharacterAbilityScorePicker";
import CharacterDetails from "./CharacterDetails";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Form = styled.div`
  width: 1280px;
  margin-bottom: 500px;
`

const Header = styled.div`
  font-size: 42px;
  color: #39ABFE;
  margin: 72px 0 32px 0;
`

const Button = styled.button`
  flex: 0;
  padding: 12px 16px;
  border-radius: 4px;
  background: #39ABFE;
  font-weight: 600;
  font-family: inherit;
  font-size: 18px;
  color: white;
  display: inline-block;
  border: none;
  cursor: pointer;
`

export default function CharacterForm() {
    const [races, updateRaces] = useState([]);
    const [classes, updateClasses] = useState([]);

    const [race, updateRace] = useState("");
    const [characterClass, updateClass] = useState("");

    const [abilities, updateAbilities] = useState({
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    });

    const [details, updateDetails] = useState({
        characterName: "",
        personality: "",
        bonds: "",
        background: "",
        ideals: "",
        flaws: "",
        alignment: "",
        featAndTraits: ""
    });

    async function handleSubmit() {
        const requestInfo = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                race,
                characterClass,
                ...abilities,
                ...details
            }),
            credentials: 'include'
        };

        const response = await fetch('http://localhost:8080/character/', requestInfo);
    }

    async function getRaces() {
        const response = await fetch("https://www.dnd5eapi.co/api/races/");
        const races = await response.json();
        updateRaces(races.results);
    }

    async function getClasses() {
        const response = await fetch("https://www.dnd5eapi.co/api/classes/")
        const classes = await response.json();
        updateClasses(classes.results)
    }

    useEffect(() => {
        getRaces();
        getClasses();
    }, []);

    const characterForm = (
        <FormContainer>
            <Form>
                <Header>Choose a race</Header>
                <CharacterRacePicker races={races} onChange={r => updateRace(r)} />
                <Header>Choose a class</Header>
                <CharacterClassPicker classes={classes} onChange={c => updateClass(c)} />
                <Header>Determine ability scores</Header>
                <CharacterAbilityScorePicker abilities={abilities} onChange={a => updateAbilities(a)} />
                <Header>Describe your character</Header>
                <CharacterDetails details={details} onChange={d => updateDetails(d)} />
                <Button onClick={handleSubmit}>Create</Button>
            </Form>
        </FormContainer>
    )

    if (races.length === 0 || classes.length === 0) {
        return <p>Loading Data</p>
    } else {
        return characterForm;
    }
}
