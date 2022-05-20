import styled from "styled-components";
import { SubmitButtonType } from "../../types/type";

export const SubmitButton = styled.button<SubmitButtonType>`
  width: ${(props) => props.width};
  height: 58px;

  background: #fc5842;
  box-shadow: 0px 10px 28px rgba(252, 88, 66, 0.2);
  border-radius: 4px;
  border: 0;

  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;

  text-align: center;

  color: #ffffff;
  margin-bottom: ${(props) => props.marginBottom};

  cursor: pointer;
`;
