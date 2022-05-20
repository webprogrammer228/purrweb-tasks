import styled from "styled-components";
import { WrapperType } from "../types/type";

export const Wrapper = styled.div<WrapperType>`
  display: flex;
  align-items: ${(props) => props.align};

  flex-direction: ${(props) => props.direction};
  margin-bottom: ${(props) => props.marginBottom};
`;
