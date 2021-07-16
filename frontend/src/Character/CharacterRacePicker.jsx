import styled, { css } from "styled-components";
import React, {useState} from "react";

const RaceListContainer = styled.div`
  width: 1280px;
  display: flex;
  flex-wrap: wrap;
`

const RaceContainer = styled.div`
  margin: 12px 28px 12px 0px;
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
`

const RaceName = styled.div`
    text-align: center;
`

const Race = (({ name, onChange, selected }) => {
  return (
      <RaceContainer>
          <RaceIcon selected={selected} onClick={() => onChange(name)} />
          <RaceName>{name}</RaceName>
      </RaceContainer>
  )
})

export default function CharacterRacePicker({ races, onChange }) {
  const [selected, updateSelected] = useState(races[0])

  const handleChange = (race) => {
      onChange(race)
      updateSelected(race)
  }
  const RaceList = () => races.map(race => <Race key={race.name} name={race.name} onChange={handleChange} selected={race.name === selected} />)

  return <RaceListContainer><RaceList/></RaceListContainer>
}