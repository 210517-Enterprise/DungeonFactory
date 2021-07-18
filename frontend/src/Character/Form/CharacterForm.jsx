import {useState, useEffect} from "react";
import styled, {keyframes} from "styled-components";
import CharacterRacePicker from "./CharacterRacePicker";
import CharacterClassPicker from "./CharacterClassPicker";
import CharacterFormProgress from "./CharacterFormProgress";
import CharacterAbilityScorePicker from "./CharacterAbilityScorePicker";
import CharacterDetails from "./CharacterDetails";
import { useHistory } from "react-router-dom";
import {Modal, CloseButton} from "../../UI/Modal";
import {zoomIn} from "react-animations";

const zoomInAnimation = keyframes`${zoomIn}`;

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

  animation: 0.2s ${zoomInAnimation};
`

const Form = styled.div`
  padding: 96px;
  position: relative;
`

export default function CharacterForm({ visible, onClose, character, onChange }) {
    const history = useHistory()
    const [races, updateRaces] = useState([]);
    const [classes, updateClasses] = useState([]);

    const [race, updateRace] = useState("");
    const [characterClass, updateClass] = useState("");

    const [currentStep, updateStep] = useState(1);

    const [slideLeft, updateSlideLeft] = useState(false);

    const [showAnimation, updateShowAnimation] = useState(false);

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
        const method = character ? "PUT" : "POST"
        const requestInfo = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: character && character.id,
                race,
                characterClass,
                ...abilities,
                ...details
            }),
            credentials: 'include'
        };

        try {
            const response = await fetch('http://localhost:8080/character', requestInfo);
            const data = await response.json()

            if (response.status === 200) {
                handleClose()
                onChange(data)
                history.push("/character/" + data.id)
            }
        } catch (e) {
            console.log("An unknown error occurred: " + e)
        }
    }

    async function getRaces() {
        const query = `
        query {
            races {
                name
                alignment
            }
        }`
        
        const requestInfo = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({query})
        };

        const response = await fetch("https://www.dnd5eapi.co/graphql", requestInfo);
        const races = await response.json();
        updateRaces(races.data.races);
    }

    async function getClasses() {
        const response = await fetch("https://www.dnd5eapi.co/api/classes/")
        const classes = await response.json();
        updateClasses(classes.results)
    }

    useEffect(() => {
        if (character === null) {
            return
        }

        updateRace(character.race)
        updateClass(character.characterClass)
        updateAbilities({
            strength: character.strength,
            dexterity: character.dexterity,
            constitution: character.constitution,
            charisma: character.charisma,
            wisdom: character.wisdom,
            intelligence: character.intelligence,
        })
        updateDetails({
            characterName: character.characterName,
            personality: character.personality,
            bonds: character.bonds,
            background: character.background,
            ideals: character.ideals,
            flaws: character.flaws,
            alignment: character.alignment,
            featAndTraits: character.featAndTraits
        });
    }, [character, visible])

    useEffect(() => {
        getRaces();
        getClasses();
    }, []);

    const handleClose = () => {
        updateShowAnimation(false)
        updateStep(1)

        updateRace("");
        updateClass("");
        updateStep(1);
        updateSlideLeft(false);
        updateShowAnimation(false);
        updateAbilities({
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        });
        updateDetails({
            characterName: "",
            personality: "",
            bonds: "",
            background: "",
            ideals: "",
            flaws: "",
            alignment: "",
            featAndTraits: ""
        });

        onClose()
    }

    const handleStepChange = (step) => {
        updateShowAnimation(true)
        updateStep(step)

        if (currentStep > step) {
            updateSlideLeft(true)
        } else {
            updateSlideLeft(false)
        }
    }

    const steps = {
        1: <CharacterRacePicker
            races={races}
            currentRace={race}
            onChange={r => updateRace(r)}
            slideLeft={slideLeft}
            showAnimation={showAnimation}
            onNext={() => handleStepChange(currentStep + 1)} />,
        2: <CharacterClassPicker
            currentClass={characterClass}
            classes={classes}
            onChange={c => updateClass(c)}
            slideLeft={slideLeft}
            onNext={() => handleStepChange(currentStep + 1)} />,
        3: <CharacterAbilityScorePicker
            abilities={abilities}
            onChange={a => updateAbilities(a)}
            onNext={() => handleStepChange(currentStep + 1)} />,
        4: <CharacterDetails
            details={details}
            onChange={d => updateDetails(d)}
            onNext={handleSubmit} />
    }

    const characterForm = (
        <Modal>
            <FormContainer>
                <Form>
                    <CloseButton onClick={handleClose} />
                    {steps[currentStep]}
                </Form>
                <CharacterFormProgress step={currentStep} onChange={handleStepChange} />
            </FormContainer>
        </Modal>
    )

    if (visible) {
        return characterForm
    } else {
        return <></>
    }
}
