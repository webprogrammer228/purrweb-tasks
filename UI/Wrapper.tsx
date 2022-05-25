import styled from "styled-components";
import { WrapperType } from "../types/type";

export const Wrapper = styled.div<WrapperType>`
  position: relative;
  display: flex;
  align-items: ${(props) => props.align};

  flex-direction: ${(props) => props.direction};
  margin-bottom: ${(props) => props.marginBottom};
  justify-content: ${(props) => props.justifyContent};
  margin-right: ${(props) => props.marginRight};
  margin-left: ${(props) => props.marginLeft};
  width: ${(props) => props.width};
`;
