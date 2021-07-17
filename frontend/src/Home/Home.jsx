import React from 'react';
import DFLogo from '../Home/logonewcolor.gif'
import styled from "styled-components"
import {Button} from "../UI/Button";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const ImageContainer = styled.div`
  margin-top: 150px;
  height: 400px;
`

const Image = styled.img`
`

const Description = styled.div`
  text-align: center;
  font-size: 20px;
`

export default function Home({ onStart }){
    return (
        <Container>
            <ImageContainer>
                <Image class="logo" src={DFLogo} alt="DungeonFactory Logo" />
            </ImageContainer>
            <Description>Easily create 5th edition DnD characters with step by step program</Description>
            <Button onClick={onStart} >Get Started</Button>
        </Container>
    )
}
