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

  @media (max-width: 1200px) {
    margin: ${(props) => props.marginMedium};
    order: ${(props) => props.order};
    display: ${(props) => (props.visible ? "none" : "flex")};
  }

  @media (max-width: 540px) {
    flex-direction: ${(props) => props.changeDirection && "column"};
    text-align: ${(props) => props.changeDirection && "center"};
    align-items: ${(props) => props.changeDirection && "center"};

    margin: ${(props) => props.noMargin && "0"};
  }
`;
