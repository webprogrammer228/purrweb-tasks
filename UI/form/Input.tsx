import styled from "styled-components";
import { InputType } from "../../types/type";

export const Input = styled.input<InputType>`
  width: ${(props) => props.width};
  height: 68px;

  padding: 25px 23px;
  margin-bottom: 24px;

  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  color: #969696;

  border: 0;
  border-radius: 10px;
  outline: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
