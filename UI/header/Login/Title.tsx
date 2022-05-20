import styled from "styled-components";

export const Title = styled.p`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;

  text-align: center;

  color: ${(props) =>
    props.color !== "/subscriptions" ? "#ffffff" : "#969696"};

  &:first-child {
    margin-left: 32px;
  }

  cursor: pointer;
`;
