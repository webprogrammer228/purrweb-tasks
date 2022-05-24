import styled from "styled-components";
import { CodeInputType } from "../../types/type";

export const CodeInput = styled.input<CodeInputType>`
  background: #393939;
  position: relative;

  box-shadow: 0 2px 12px rgba(20, 20, 43, 0.06);
  border: 0;
  border-radius: 6px;
  width: ${(props) => props.width};
  height: 68px;

  padding: ${(props) => props.padding};

  outline: 0;

  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: #969696;

  //url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 20.999H27V4.99902H11V10.999' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M20.9999 10.999H4.99988V26.999H20.9999V10.999Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
`;
