import styled, {css} from "styled-components";
import {capitalize} from "../../util";
import React, {useEffect, useState} from "react";
import {Header} from "./Header";
import {Slide} from "../../UI/Slide";
import {Button} from "../../UI/Button";
import ReactTooltip from "react-tooltip";

const Container = styled.div`
  margin-bottom: 42px;
`

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const OptionHeading = styled.div`
  margin-bottom: 12px;
  margin-top: 24px;
`

const Option = styled.div`
  background: #2D3439;
  border-radius: 2px;
  padding: 6px 8px;
  margin-right: 12px;
  margin-bottom: 12px;
  user-select: none;
  cursor: pointer;
  
  ${props => props.selected && css`background: #39ABFE; color: white`}
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #2D3439;
  margin: 42px 0;
`

const Message = styled.div`
    margin-bottom: 24px;
`

const Options = ({ classInfo, onChange, proficiencies }) => {
    if (!classInfo) {
        return <></>
    }

    const handleClick = (choice) => () => {
        const selected = proficiencies.split(',')

        if (proficiencies.indexOf(choice) !== -1) {
            onChange(selected.filter(s => s !== choice).join(","))
        } else {
            selected.push(choice)
            onChange(selected.join(","))
        }
    }

    console.log(classInfo)

    return (
        <Container>
            {classInfo.proficiency_choices.map(choices =>
                <div key={choices}>
                    <OptionHeading>
                        Choose {choices.choose}
                    </OptionHeading>
                    <OptionContainer>
                        {choices.from.map(c => <Option onClick={handleClick(c.index)}
                                                       key={c.index}
                                                       selected={proficiencies.indexOf(c.index) !== -1}>{c.name}</Option>)}
                    </OptionContainer>
                </div>)}
            <Divider />
            {classInfo.spellcasting && <OptionHeading>Spellcasting</OptionHeading>}
            <OptionContainer>
                {classInfo.spellcasting && classInfo.spellcasting.info.map(s =>
                    <Option key={s.name} data-tip data-for={s.name}>{s.name}
                        <ReactTooltip id={s.name} effect='solid'><div style={{maxWidth: 200}}>{s.desc}</div></ReactTooltip>
                    </Option> )}
            </OptionContainer>
        </Container>
    )
}

export default function CharacterFeatures({ onChange, proficiencies, slideLeft, onNext, classInfo }) {
    return (
        <Slide slideLeft={slideLeft}>
            <Header>Class features</Header>
            {!classInfo && <Message>You have not selected a class yet.</Message>}
            <Options classInfo={classInfo} proficiencies={proficiencies} onChange={onChange} />
            <Button onClick={onNext}>Next</Button>
        </Slide>
    )
}
