import styled from "styled-components";

type TitleProps = {
  path?: string;
};

export const Title = styled.p<TitleProps>`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;

  text-align: center;

  color: ${(props) =>
    props.path !== "/subscriptions" ? "#ffffff" : "#969696"};

  &:first-child {
    margin-left: 32px;
  }

  cursor: pointer;
`;
