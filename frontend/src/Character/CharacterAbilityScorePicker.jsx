import styled, { css } from "styled-components";
import React, {useState} from "react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const AbilityContainer = styled.div`
`

const ScoreContainer = styled.div`
`

const ScoreNumber = styled.div`
  font-size: 82px;
  text-align: center;
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

const Ability = ({ ability, onChange }) => {
    const [name, value] = ability;

    return (
        <AbilityContainer>
            <ScoreContainer>
                <ScoreInput key={name} value={value} onChange={e => onChange(name, e.target.value)} />
            </ScoreContainer>
            <AbilityName>{name.charAt(0).toUpperCase() + name.slice(1)}</AbilityName>
        </AbilityContainer>
    )
}

const AbilityList = ({ abilities, onChange }) => {
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

    return Object.entries(abilities).map(a => <Ability key={a[0]} ability={a} onChange={handleChange}/> )
}

export default function CharacterAbilityScorePicker(props) {
    return (
        <Container>
            <AbilityList {...props}/>
        </Container>
    )
}
