import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import add from './icons/adddark.png';
import {classToPng} from './CharacterImages';
import { Link, Redirect } from 'react-router-dom';
import './Form/CharacterList.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  margin-top: 82px;
  width: 1200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const ImagePlaceholder = styled.div`
  width: 240px;
  height: 240px;
  background: #2D3439;
`

const RowPlaceholder = styled.div`
  width: 240px;
  margin-left: 25px;
  margin-right: 25px;
`

const Card = styled.div`
  transition: 0.5s;
  border-radius: 8px;
  width: 240px;
  margin-left: 25px;
  margin-right: 25px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  margin-top: 42px;
  
  display: flex;
  flex-direction: column;
  opacity: 0.6;
  
  &:hover {
    opacity: 1;
    transition: all 0.2s;
  }
`

const CardFooter = styled.div`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  background: #313A40;
  text-decoration: none;
  color: #7D94A4;
`

export default function CharList({ user, onCreate }){
    const [characters, updateCharacters] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/character', {method: 'GET', credentials: 'include'})
        .then(response => response.json())
        .then(json => updateCharacters(json))
    }, [])

    if (!user) {
        return <Redirect to="/"/>
    }

    return (
        <Container>
            <Content>
                <Card onClick={onCreate}>
                    <img src={add} alt="Add a new character"/>
                    <CardFooter>Add a character</CardFooter>
                </Card>
                {characters.map(character => (
                    <Link to={`/character/${character.id}`}>
                        <Card>
                            {character.characterClass
                                ? <img src={classToPng(character.characterClass)} alt={character.characterClass}/>
                                : <ImagePlaceholder/>}

                            <CardFooter>{character.characterName || "Nobody"}</CardFooter>
                        </Card>
                    </Link>))}
                <RowPlaceholder/>
                <RowPlaceholder/>
                <RowPlaceholder/>
            </Content>
        </Container>
    )
}