import React from 'react';
import DFLogo from '../Home/logonewcolor.gif'
import styled from "styled-components"

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

const Button = styled.button`
  flex: 0;
  padding: 12px 18px;
  border-radius: 4px;
  background: #39ABFE;
  font-weight: 600;
  font-family: inherit;
  font-size: 18px;
  color: white;
  display: inline-block;
  border: none;
  cursor: pointer;
  margin-top: 42px;
  margin-right: 18px;
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
