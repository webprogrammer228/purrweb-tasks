import styled from "styled-components";
import { CheckboxType } from "../../types/type";

export const CheckBox = styled.input<CheckboxType>`
  min-width: 28px;
  min-height: 28px;
  position: relative;

  background: #c7c7c7;
  border: 1px solid ${(props) => (props.isActive ? "#c7c7c7" : "#FC5842")};
  margin-top: 25px;

  box-shadow: 0px 2px 6px rgba(20, 20, 43, 0.06);
  border-radius: 7px;
  align-self: center;

  cursor: pointer;

  display: flex;
  appearance: none;
  margin-right: 48px;
  overflow: hidden;

  &:checked {
    &::after {
      border-radius: 5px;
      border: 1px solid ${(props) => (props.isActive ? "#c7c7c7" : "#FC5842")};
      appearance: none;
      content: "";
      display: block;
      z-index: 1;
      background: ${(props) => (props.isActive ? "#c7c7c7" : "#FC5842")};
      width: 100%;
      height: 100%;
    }

    &::before {
      position: absolute;
      content: url("data:image/svg+xml,%3Csvg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.66406 6.90524L5.28448 10.5257L14.3355 1.47461' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #c7c7c7;
      z-index: 1;
      background: ${(props) => (props.isActive ? "#c7c7c7" : "#FC5842")};
    }
  }
`;
