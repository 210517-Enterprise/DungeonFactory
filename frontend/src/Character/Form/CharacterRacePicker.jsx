import styled, {css} from "styled-components";
import React, {useState} from "react";
import {Header} from "./Header";
import {Slide} from "../../UI/Slide";
import {Button} from "../../UI/Button";
import {raceToPng} from "../CharacterImages";
import ReactTooltip from 'react-tooltip';

const RaceListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 42px;
`

const RaceContainer = styled.div`
  margin: 12px 28px 28px 0;
  justify-content: center;
`

const RaceIcon = styled.div`
  width: 140px;
  height: 140px;
  background: #2D3439;
  border-radius: 200px;
  margin-bottom: 22px;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0);
  ${props => props.selected && css`border: 4px solid #39ABFE;`};
  background-image: url(${props => props.img});
  background-size: 150px;
  background-position: 50% 30%;
  background-repeat: no-repeat;
`

const RaceName = styled.div`
    text-align: center;
`

const Race = (({ name, onChange, selected, img, desc}) => {
  return (
      <RaceContainer>
          <RaceIcon selected={selected} img={img} onClick={() => onChange(name)} data-tip data-for={name}/>
          <ReactTooltip id={name} effect='solid'><div style={{maxWidth: 200}}>{desc}</div></ReactTooltip>
          <RaceName>{name}</RaceName>
      </RaceContainer>
  )
})

export default function CharacterRacePicker({ currentRace, races, onChange, slideLeft, showAnimation, onNext }) {
    const handleChange = (race) => {
        onChange(race)
    }

    const RaceList = () => races.map(race => <Race key={race.name} name={race.name} onChange={handleChange} img={raceToPng(race.name)} selected={race.name === currentRace} desc={race.alignment}/>)

    return (
        <Slide slideLeft={slideLeft} disabled={!showAnimation}>
          <Header>Choose a race</Header>
            <RaceListContainer>
                <RaceList/>
            </RaceListContainer>
            {currentRace && <Button onClick={onNext}>Next</Button>}
        </Slide>
    )
}
