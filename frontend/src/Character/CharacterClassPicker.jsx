import styled, { css } from "styled-components";
import React, {useState} from "react";

const ClassListContainer = styled.div`
  width: 1280px;
  display: flex;
  flex-wrap: wrap;
`

const ClassContainer = styled.div`
  margin: 12px 28px 12px 0px;
  justify-content: center;
`

const ClassIcon = styled.div`
  width: 140px;
  height: 140px;
  background: #2D3439;
  margin-bottom: 22px;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0);
  ${props => props.selected && css`border: 4px solid #39ABFE;`};
`

const ClassName = styled.div`
    text-align: center;
`

const CharacterClass = (({ name, onChange, selected }) => {
    return (
        <ClassContainer onClick={() => onChange(name)} >
            <ClassIcon selected={selected} />
            <ClassName>{name}</ClassName>
        </ClassContainer>
    )
})

export default function CharacterClassPicker({ classes, onChange }) {
    const [selected, updateSelected] = useState(classes[0])

    const handleChange = (charClass) => {
        onChange(charClass)
        updateSelected(charClass)
    }
    const ClassList = () => classes.map(c => <CharacterClass key={c.name} name={c.name} onChange={handleChange} selected={c.name === selected} />)

    return <ClassListContainer><ClassList/></ClassListContainer>
}
