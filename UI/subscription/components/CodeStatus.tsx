import styled from "styled-components";
import { CodeStatusType } from "../../../types/type";

const CodeStatus = styled.span<CodeStatusType>`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;

  color: ${(props) => (props.color === "INACTIVE" ? "#FF5A65" : "#05C168")};
  margin-top: 15px;
`;

export { CodeStatus };
