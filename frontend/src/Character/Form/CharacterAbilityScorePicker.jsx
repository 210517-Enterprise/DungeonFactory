import styled from "styled-components";
import React, {useState} from "react";
import {Header} from "./Header";
import {Slide} from "../../UI/Slide";
import {Button} from "../../UI/Button";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 42px;
  margin-bottom: 42px;
`

const AbilityContainer = styled.div`
  border-radius: 4px;
`

const ScoreContainer = styled.div`
`

const AbilityName = styled.div`
  text-align: center;
`

const ScoreInput = styled.input`
  color: inherit;
  text-align: center;
  background: none;
  border: none;
  font-size: 82px;
  width: 2em;

  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: inherit;
    border: none;
  }
`

const ScoreNumber = styled.div`
  font-size: 82px;
  width: 1.65em;
  text-align: center;
  user-select: none;
  cursor: pointer;
  padding: 18px 0;
  margin-bottom: 18px;

  background: #2D3439;
`

const Ability = ({ ability, abilities, onChange, onDragging, dragging }) => {
    const [name, value] = ability;

    const [editing, updateEditing] = useState(false)

    const handleDrop = (n, v) => (e) => {
        e.preventDefault()
        onChange({
            ...abilities,
            [dragging.name]: value,
            [name]: dragging.value
        })
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDragStart = (e) => {
        onDragging({name, value})
    }


    return (
        <AbilityContainer>
            <ScoreContainer>
                {editing
                    ? <ScoreInput key={name} value={value} onChange={e => onChange(name, e.target.value)} />
                    : <ScoreNumber key={name}
                                   draggable
                                   onDrop={handleDrop(name, value)}
                                   onDragOver={handleDragOver}
                                   onDragStart={handleDragStart}>
                        {value}
                    </ScoreNumber>
                }

            </ScoreContainer>
            <AbilityName>{name.charAt(0).toUpperCase() + name.slice(1)}</AbilityName>
        </AbilityContainer>
    )
}

const AbilityList = ({ abilities, onChange, dragging, onDragging }) => {
    const handleChange = (name, value) => {
        let valueInt = parseInt(value, 10)
        if (value === "") {
            valueInt = 0
        } else if (isNaN(valueInt)) {
            return
        }

        onChange({
            ...abilities,
            [name]: valueInt
        })
    }

    return Object.entries(abilities).map(a =>
        <Ability key={a[0]}
                 ability={a}
                 onInputChange={handleChange}
                 onChange={onChange}
                 abilities={abilities}
                 dragging={dragging}
                 onDragging={onDragging}
        />)
}

export default function CharacterAbilityScorePicker(props) {
    const { slideLeft, onNext, abilities, onChange } = props

    const [dragging, updateDragging] = useState(null)

    const handleRoll = () => {
        const randomAbilities = {...abilities}

        const roll = () => Math.floor(Math.random() * 6) + 1 ;

        for (let key in randomAbilities) {
            // Roll 4 d6 and sum the top 3
            randomAbilities[key] = [roll(), roll(), roll(), roll()].sort().slice(-3).reduce((acc, value) => acc + value)
        }

        onChange(randomAbilities)
    }

    return (
        <Slide slideLeft={slideLeft}>
            <Header>Determine Ability Scores</Header>
            <Container>
                <AbilityList {...props} dragging={dragging} onDragging={updateDragging} />
            </Container>
            <Button onClick={handleRoll} background="#7D94A4">Roll</Button>
            <Button onClick={onNext}>Next</Button>
        </Slide>
    )
}
