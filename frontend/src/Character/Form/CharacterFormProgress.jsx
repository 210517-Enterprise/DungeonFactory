import styled, { css } from "styled-components";

const Container = styled.div`
  background: #2D3439;
  flex: 0 0 auto;
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Progress = styled.div`
  height: 5px;
  width: 100%;
  background: #343C41;
`

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const Step = styled.div`
  font-size: 24px;
  margin-right: 42px;
  cursor: pointer;
  ${props => props.step === props.currentStep && css`color: #39ABFE;`};
`

const StepDivider = styled.div`
  color: #4E6372;
  font-size: 24px;
  text-align: center;
  margin-right: 42px;
  position: relative;
  bottom: 6px;
`

export default function CharacterFormProgress({ step, onChange }) {
    return (
        <Container>
            <Progress />
            <StepContainer>
                <Step step={1} currentStep={step} onClick={() => onChange(1)}>Race</Step>
                <StepDivider>......................</StepDivider>
                <Step step={2} currentStep={step} onClick={() => onChange(2)}>Class</Step>
                <StepDivider>......................</StepDivider>
                <Step step={3} currentStep={step} onClick={() => onChange(3)}>Ability</Step>
                <StepDivider>......................</StepDivider>
                <Step step={4} currentStep={step} onClick={() => onChange(4)}>Details</Step>
            </StepContainer>
        </Container>
    )
}