import styled, {css} from "styled-components";
import {capitalize} from "../util";
import {useState} from "react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const DetailColumn = styled.div`
`

const Label = styled.div`
`

const Input = styled.input`
  background: #2D3439;
  border: none;
  padding: 12px 18px;
  margin: 14px 0px;
  font-size: 16px;
  box-sizing: border-box;
  color: inherit;
`

const TextArea = styled.textarea`
  background: #2D3439;
  border: none;
  padding: 12px 18px;
  margin: 14px 0px;
  font-size: 16px;
  box-sizing: border-box;
  color: inherit;
  width: 100%;
  resize: none;
`

const Field = ({ name, label, multi, rows, onChange, details }) => {
    const handleChange = e => {
        onChange({
            ...details,
            [name]: e.target.value
        })
    }

    let inputComponent;
    if (multi) {
        inputComponent = <TextArea rows={rows || 4} value={details[name]} onChange={handleChange} />
    } else {
        inputComponent = <Input value={details[name]} onChange={handleChange} />
    }

    return (
        <>
            <Label>{label || capitalize(name)}</Label>
            {inputComponent}
        </>
    )
}

export default function CharacterDetails({ details, onChange }) {
    return (
        <Container>
            <DetailColumn>
                <Field name="characterName" label="Character Name" onChange={onChange} details={details} />
                <Field name="personality" onChange={onChange} details={details} label="Personality Traits" multi={true} />
                <Field name="bonds" onChange={onChange} details={details} multi={true} />
            </DetailColumn>
            <DetailColumn>
                <Field name="background" onChange={onChange} details={details} />
                <Field name="ideals" onChange={onChange} details={details} multi={true} />
                <Field name="flaws" onChange={onChange} details={details} multi={true} />
            </DetailColumn>
            <DetailColumn>
                <Field name="alignment" onChange={onChange} details={details} />
                <Field name="featAndTraits" onChange={onChange} details={details} multi={true} rows="12" label="Features & Traits" />
            </DetailColumn>
        </Container>
    )
}