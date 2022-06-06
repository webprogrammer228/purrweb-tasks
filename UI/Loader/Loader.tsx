import styled, { keyframes } from "styled-components";

const loader = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderWrapper = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 20%;
  left: 50%;
  right: 50%;
  bottom: 50%;
`;

export const Loader = styled.div`
  border: 0.2em solid transparent;
  border-top-color: lightblue;
  border-radius: 50%;
  animation: 1s ${loader} linear infinite;
  position: relative;

  display: inline-block;
  width: 4em;
  height: 4em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;

  &:before {
    content: "";
    display: block;
    width: inherit;
    height: inherit;
    position: absolute;
    top: -0.2em;
    left: -0.2em;
    border: 0.2em solid lightblue;
    border-radius: 50%;
    opacity: 1;
  }
`;
