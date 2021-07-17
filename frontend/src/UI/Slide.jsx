import styled, {css, keyframes} from "styled-components";
import {slideInLeft, slideInRight} from "react-animations";

const slideInRightAnimation = keyframes`${slideInRight}`;
const slideInLeftAnimation = keyframes`${slideInLeft}`;

export const Slide = styled.div`
  ${props => {
      if (!props.disabled) {
        return props.slideLeft
                ? css`animation: 0.3s ${slideInLeftAnimation}`
                : css`animation: 0.3s ${slideInRightAnimation}`
      }
  } };
`
