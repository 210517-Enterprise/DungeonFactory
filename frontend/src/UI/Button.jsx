import styled from "styled-components";

export const Button = styled.button`
  flex: 0;
  padding: 12px 18px;
  border-radius: 4px;
  background: ${props => props.background || "#39ABFE"};
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
