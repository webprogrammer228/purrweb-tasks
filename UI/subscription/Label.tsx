import styled from "styled-components";

export const Label = styled.label`
  display: flex;

  order: 0;
  margin-right: 48px;
  margin-top: 25px;

  & > span {
    display: none;
  }

  @media (max-width: 1200px) {
    width: fit-content;
    display: flex;
    margin-right: 0;
    margin-top: 0;

    & > input {
      margin-bottom: 0;
    }

    & + div {
      margin-right: 0;
    }

    & > span {
      display: block;
      margin-top: 0;
      margin-left: 20px;
    }
  }

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;
