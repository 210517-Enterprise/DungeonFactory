import { useState, useEffect } from "react";
import styled from "styled-components";
import CharacterRacePicker from "./CharacterRacePicker";
import CharacterClassPicker from "./CharacterClassPicker";
import CharacterFormProgress from "./CharacterFormProgress";
import CharacterAbilityScorePicker from "./CharacterAbilityScorePicker";
import CharacterDetails from "./CharacterDetails";

const Modal = styled.div`
  position: fixed;
  right: 0;
  z-index: 999999;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
`

const FormContainer = styled.div`
  z-index: 2;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 1280px;
  height: 960px;
  background: #262C30;
  border-radius: 20px;
  overflow: hidden;
`

const Form = styled.div`
  padding: 96px;
  position: relative;
`

const Button = styled.button`
  flex: 0;
  padding: 12px 18px;
  border-radius: 4px;
  background: #39ABFE;
  font-weight: 600;
  font-family: inherit;
  font-size: 18px;
  color: white;
  display: inline-block;
  border: none;
  cursor: pointer;
  margin-top: 42px;
  margin-right: 18px;
`

const CloseButton = styled.div`
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  cursor: pointer;
  position: absolute;
  
  &:hover {
    opacity: 0.8;
  }
  &:before, &:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background: #fff;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`

export default function CharacterForm({ visible, onClose }) {
    const [races, updateRaces] = useState([]);
    const [classes, updateClasses] = useState([]);

    const [race, updateRace] = useState("");
    const [characterClass, updateClass] = useState("");

    const [currentStep, updateStep] = useState(1);

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

    const steps = {
        1: <CharacterRacePicker races={races} onChange={r => updateRace(r)} />,
        2: <CharacterClassPicker classes={classes} onChange={c => updateClass(c)} />,
        3: <CharacterAbilityScorePicker abilities={abilities} onChange={a => updateAbilities(a)} />,
        4: <CharacterDetails details={details} onChange={d => updateDetails(d)} />
    }

    let button;
    if (currentStep === 4) {
        button = <Button onClick={handleSubmit}>Save</Button>
    } else {
        button = <Button onClick={() => updateStep(currentStep + 1)}>Next</Button>
    }

    const characterForm = (
        <Modal>
            <FormContainer>
                <Form>
                    <CloseButton onClick={onClose} />
                    {steps[currentStep]}
                    {button}
                </Form>
                <CharacterFormProgress step={currentStep} onChange={step => updateStep(step)}/>
            </FormContainer>
        </Modal>
    )

    if (visible) {
        return characterForm
    } else {
        return <></>
    }
}
